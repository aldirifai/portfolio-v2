# Deploy runbook — aldirifai.com

This is the operational runbook for the self-hosted deployment of
`aldirifai.com`. The application runs as a single Next.js standalone
container, fronted by Nginx with Let's Encrypt TLS, on an IDCloudHost VPS.

If you've never deployed before, work top-to-bottom: **Prerequisites →
One-time VPS bootstrap → GitHub Secrets → Resend domain → first deploy**.
Subsequent deploys are just `git push origin main`.

---

## 1. Prerequisites

**VPS sizing**

| Tier        | vCPU | RAM   | Disk  | Verdict                                |
| ----------- | ---- | ----- | ----- | -------------------------------------- |
| Minimum     | 1    | 2 GB  | 20 GB | Builds work but are slow; OOM possible |
| Recommended | 2    | 4 GB  | 40 GB | Comfortable for `docker compose build` |

Ubuntu **22.04 LTS** or newer (24.04 fine). The runbook assumes Ubuntu APT
package names; adapt for Debian/RHEL if needed.

**Tooling installed during bootstrap**

- Docker Engine + Compose v2 plugin
- Nginx (system package, fronts the container)
- Certbot + python3-certbot-nginx (Let's Encrypt)
- git, curl, ufw

**External access required**

- DNS provider for `aldirifai.com` (to add A records)
- Resend account with verified `aldirifai.com` sender domain
- GitHub repo admin access (to add deploy secrets)

---

## 2. One-time VPS bootstrap

> Run as `root` first, then switch to the `deploy` user partway through.

### 2.1 SSH in as root and create the deploy user

```bash
ssh root@<VPS_IP>

useradd -m -s /bin/bash deploy
passwd deploy                       # set a strong password
usermod -aG sudo deploy             # sudo without password? leave it required.
```

### 2.2 Set up SSH key for the deploy user

On your **local** machine, generate a key pair *just* for this VPS:

```bash
ssh-keygen -t ed25519 -f ~/.ssh/aldirifai_deploy -C "deploy@aldirifai.com"
```

Copy the **public** key to the VPS:

```bash
ssh-copy-id -i ~/.ssh/aldirifai_deploy.pub deploy@<VPS_IP>
# or, manually on the VPS:
mkdir -p /home/deploy/.ssh && chmod 700 /home/deploy/.ssh
echo "<paste public key>" >> /home/deploy/.ssh/authorized_keys
chmod 600 /home/deploy/.ssh/authorized_keys
chown -R deploy:deploy /home/deploy/.ssh
```

Test from local:

```bash
ssh -i ~/.ssh/aldirifai_deploy deploy@<VPS_IP>   # should not prompt for password
```

### 2.3 Disable root SSH login

```bash
sudo sed -i 's/^#\?PermitRootLogin.*/PermitRootLogin no/' /etc/ssh/sshd_config
sudo sed -i 's/^#\?PasswordAuthentication.*/PasswordAuthentication no/' /etc/ssh/sshd_config
sudo systemctl reload ssh
```

Verify a fresh terminal can still log in as `deploy`. **Don't close the
existing session** until you've confirmed.

### 2.4 Firewall (UFW)

```bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22/tcp     # SSH
sudo ufw allow 80/tcp     # HTTP (Certbot ACME + redirect)
sudo ufw allow 443/tcp    # HTTPS
sudo ufw enable           # answer "y" to keep current SSH session
sudo ufw status verbose   # confirm
```

### 2.5 Install Docker

```bash
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker deploy
# Log out and back in for group membership to take effect.
```

Verify:

```bash
docker --version
docker compose version
```

### 2.6 Install Nginx + Certbot

```bash
sudo apt update
sudo apt install -y nginx certbot python3-certbot-nginx
```

### 2.7 (Optional) Add 4 GB swap if RAM < 4 GB

```bash
sudo fallocate -l 4G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
free -h    # confirm swap is now active
```

### 2.8 Create app directory and clone

```bash
sudo mkdir -p /var/www/aldirifai.com
sudo chown deploy:deploy /var/www/aldirifai.com
sudo -u deploy bash <<'EOF'
cd /var/www/aldirifai.com
git clone https://github.com/aldirifai/portfolio-v2.git .
EOF
```

> If the repo is private, set up a deploy key on the VPS first
> (`ssh-keygen -t ed25519 -f ~/.ssh/github_deploy`, add public key to GitHub
> Settings → Deploy Keys for the repo, then clone via SSH URL).

### 2.9 Create production env file

As the `deploy` user:

```bash
cd /var/www/aldirifai.com
cp deploy/.env.production.template .env.production
# Edit and fill in real values:
nano .env.production
```

Required values:

- `RESEND_API_KEY` — copy from <https://resend.com/api-keys>
- `CONTACT_FROM_EMAIL` — must match a verified sender on Resend (see § 4)
- `CONTACT_TO_EMAIL` — your inbox
- `NEXT_PUBLIC_SITE_URL` — `https://aldirifai.com`
- `NODE_ENV` — `production`

### 2.10 First container build + start

```bash
docker compose build
docker compose up -d
docker compose logs -f web   # watch until "Ready in" appears, then Ctrl-C
```

Verify the container is healthy:

```bash
curl -s http://localhost:3000/api/health
# {"ok":true,"timestamp":"2026-..."}
```

### 2.11 Wire Nginx to the container

```bash
sudo ln -s /var/www/aldirifai.com/deploy/nginx/aldirifai.com.conf \
           /etc/nginx/sites-enabled/aldirifai.com.conf
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t      # config test must pass
sudo systemctl reload nginx
```

> The Nginx config references SSL files that **don't exist yet**
> (`/etc/letsencrypt/live/aldirifai.com/...`). `nginx -t` will fail until
> Certbot creates them. Skip ahead to step 2.13 first if `nginx -t` fails;
> Certbot will fix the config in place when it issues the cert.
>
> If you want a clean cutover, comment out the `ssl_*` lines and the
> `listen 443` blocks temporarily, then re-enable after Certbot runs.

### 2.12 Update DNS records

In your DNS provider (Cloudflare / registrar):

| Type | Host                | Value         | TTL |
| ---- | ------------------- | ------------- | --- |
| A    | `aldirifai.com`     | `<VPS_IP>`    | 300 |
| A    | `www.aldirifai.com` | `<VPS_IP>`    | 300 |

Wait for propagation:

```bash
dig +short aldirifai.com    # should print VPS IP
dig +short www.aldirifai.com
```

Cloudflare proxy (orange cloud): leave **disabled** (DNS-only, grey cloud)
until you've decided whether to put Cloudflare in front of Nginx. Easier to
debug TLS without it.

### 2.13 Issue Let's Encrypt certificate

```bash
sudo certbot --nginx -d aldirifai.com -d www.aldirifai.com
```

Answer the prompts:

- Email address: yours (for renewal warnings)
- Terms of Service: `Y`
- EFF mailing list: your call
- Redirect HTTP to HTTPS: **`2` (Redirect)** — Certbot will edit your nginx
  config to add the redirect. Our config already redirects manually; either
  works, but choosing `2` keeps Certbot's edits idempotent.

Verify auto-renewal:

```bash
sudo certbot renew --dry-run
```

### 2.14 Smoke test the live site

From your local machine:

```bash
curl -I https://aldirifai.com           # 200 OK, valid TLS
curl    https://aldirifai.com/api/health # {"ok":true,...}
```

In a browser, confirm:

- HTTPS lock with no warning
- Theme toggle works
- `/blog/hello` renders with code block syntax highlight

---

## 3. GitHub Secrets

Repo Settings → Secrets and variables → Actions → New repository secret:

| Secret           | Value                                                          |
| ---------------- | -------------------------------------------------------------- |
| `VPS_HOST`       | VPS IP or hostname                                             |
| `VPS_USER`       | `deploy`                                                       |
| `VPS_SSH_PORT`   | `22` (or your custom port)                                     |
| `VPS_SSH_KEY`    | full private-key contents (`-----BEGIN OPENSSH PRIVATE KEY-----` …) |

The private key is the deploy key from step 2.2 (`~/.ssh/aldirifai_deploy`,
not `~/.ssh/aldirifai_deploy.pub`). Use this key only for CI/CD; keep your
personal SSH key separate.

After secrets are set, the next push to `main` triggers `.github/workflows/deploy.yml`.

---

## 4. Resend domain verification

Add `aldirifai.com` in the Resend dashboard. Resend will display 4 DNS
records to add. Typical shape:

| Type   | Host                                  | Value (example)                                     | Purpose                       |
| ------ | ------------------------------------- | --------------------------------------------------- | ----------------------------- |
| `MX`   | `send.aldirifai.com`                  | `feedback-smtp.<region>.amazonses.com` (priority 10) | SES bounce / complaint return |
| `TXT`  | `send.aldirifai.com`                  | `v=spf1 include:amazonses.com ~all`                 | SPF authorize SES             |
| `TXT`  | `resend._domainkey.aldirifai.com`     | (long DKIM public key)                              | DKIM signing                  |
| `TXT`  | `_dmarc.aldirifai.com` (recommended)  | `v=DMARC1; p=none;`                                 | DMARC monitor mode            |

Notes:

- `<region>` depends on your Resend region pick (often `us-east-1`).
- The DKIM TXT value can be ~250–400 chars; most DNS providers accept it
  as a single string.
- DMARC `p=none` is monitor-only; tighten to `quarantine` after a few weeks
  of clean reports.
- These records are subdomain-scoped — your apex `aldirifai.com` MX records
  for personal email stay untouched.

After Resend shows "Verified", update `.env.production` on the VPS:

```bash
cd /var/www/aldirifai.com
nano .env.production            # set CONTACT_FROM_EMAIL=noreply@aldirifai.com
docker compose up -d            # reloads container with new env
```

Test by submitting the contact form on production. Email should arrive at
`CONTACT_TO_EMAIL` within seconds.

---

## 5. Subsequent deploys

```bash
git push origin main
```

GitHub Actions runs `.github/workflows/deploy.yml`. It SSHs into the VPS,
pulls main, rebuilds the image, and starts the new container. Total time:
~2–4 minutes depending on layer cache.

Watch the run at:

```
https://github.com/aldirifai/portfolio-v2/actions
```

---

## 6. Rollback

### Soft rollback (revert + redeploy)

```bash
git revert <bad-commit-sha>
git push origin main
```

Auto-redeploys the revert via the standard workflow.

### Hard rollback (SSH directly to VPS)

```bash
ssh deploy@<VPS_IP>
cd /var/www/aldirifai.com
git fetch --all
git reset --hard <last-known-good-sha>
docker compose build
docker compose up -d
curl -s http://localhost:3000/api/health
```

After hard rollback, fix `main` upstream (revert or fix-forward) so the
next CI push doesn't reintroduce the bad code.

---

## 7. Troubleshooting

| Symptom                                      | Likely cause                                                    | Fix                                                                          |
| -------------------------------------------- | --------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `docker compose build` killed mid-build      | Out of memory                                                   | Add 4 GB swap (§ 2.7) or upgrade VPS RAM                                     |
| Site shows **502 Bad Gateway**               | Container down                                                  | `docker compose ps`, then `docker compose logs --tail=200 web`               |
| Site shows **default Nginx page**            | `default` site still enabled                                    | `sudo rm /etc/nginx/sites-enabled/default && sudo systemctl reload nginx`   |
| `nginx -t` fails: SSL cert not found         | First-run before Certbot                                        | Comment out `ssl_*` directives temporarily, run Certbot, uncomment           |
| Certbot fails with **DNS error**             | DNS hasn't propagated to Let's Encrypt resolvers                | Wait 5–30 minutes, retry                                                     |
| Certbot fails with **port 80 unreachable**   | UFW blocking 80, or another service on 80                       | `sudo ufw allow 80/tcp`; `sudo lsof -i :80` to find squatters                |
| GitHub Actions SSH timeout                   | Wrong host/key/port, or VPS firewall                            | Verify `VPS_HOST`/`VPS_SSH_PORT`; test `ssh -i deploy_key deploy@host` locally |
| Health check fails after deploy              | App didn't start; usually env or build error                    | `docker compose logs --tail=200 web`                                         |
| Form submits but email never arrives         | Resend domain not verified, or wrong `CONTACT_FROM_EMAIL`       | Check Resend dashboard logs; verify DNS records                              |

---

## 8. Logs

```bash
# Live tail
docker compose logs -f web

# Last 200 lines
docker compose logs --tail=200 web

# Nginx access + error logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# System resource snapshot
docker stats --no-stream
free -h
df -h
```

---

## 9. Future migration: build-on-CI, push image to ghcr.io

Currently the VPS does the heavy lifting (`docker compose build` runs Next.js
build inside the container on the VPS). This works but is slow (~1–3 min)
and contended with running traffic during the build window.

Cleaner alternative once you feel build pain:

1. GitHub Actions builds the image on the runner (fast cache).
2. Pushes to `ghcr.io/aldirifai/portfolio-v2:<sha>` and `:latest`.
3. VPS step becomes `docker pull` + `docker compose up -d`.

Sketch:

```yaml
- uses: docker/setup-buildx-action@v3
- uses: docker/login-action@v3
  with:
    registry: ghcr.io
    username: ${{ github.actor }}
    password: ${{ secrets.GITHUB_TOKEN }}
- uses: docker/build-push-action@v5
  with:
    push: true
    tags: ghcr.io/aldirifai/portfolio-v2:latest,ghcr.io/aldirifai/portfolio-v2:${{ github.sha }}
    cache-from: type=gha
    cache-to: type=gha,mode=max
```

Defer until VPS builds feel slow or RAM-pressured. The current setup is
intentionally simple to start.

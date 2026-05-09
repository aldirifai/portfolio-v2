import { ImageResponse } from "next/og";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const GEIST_BOLD_URL =
  "https://github.com/vercel/geist-font/raw/main/packages/next/dist/fonts/geist-sans/Geist-Bold.ttf";
const GEIST_REGULAR_URL =
  "https://github.com/vercel/geist-font/raw/main/packages/next/dist/fonts/geist-sans/Geist-Regular.ttf";
const INTER_BOLD_FALLBACK =
  "https://unpkg.com/@fontsource/inter@5.0.16/files/inter-latin-700-normal.woff";
const INTER_REGULAR_FALLBACK =
  "https://unpkg.com/@fontsource/inter@5.0.16/files/inter-latin-400-normal.woff";

const FONT_FETCH_TIMEOUT_MS = 2000;

type LoadedFonts = {
  bold: ArrayBuffer;
  regular: ArrayBuffer;
  family: "Geist" | "Inter";
};

let cachedFonts: LoadedFonts | null = null;

async function fetchWithTimeout(url: string, ms: number): Promise<ArrayBuffer> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), ms);
  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) throw new Error(`fetch ${url} returned ${res.status}`);
    return await res.arrayBuffer();
  } finally {
    clearTimeout(timeout);
  }
}

async function loadFonts(): Promise<LoadedFonts> {
  if (cachedFonts) return cachedFonts;
  try {
    const [bold, regular] = await Promise.all([
      fetchWithTimeout(GEIST_BOLD_URL, FONT_FETCH_TIMEOUT_MS),
      fetchWithTimeout(GEIST_REGULAR_URL, FONT_FETCH_TIMEOUT_MS),
    ]);
    cachedFonts = { bold, regular, family: "Geist" };
  } catch (error) {
    console.warn("[og] Geist font fetch failed, falling back to Inter:", error);
    const [bold, regular] = await Promise.all([
      fetchWithTimeout(INTER_BOLD_FALLBACK, FONT_FETCH_TIMEOUT_MS).catch(
        () => null,
      ),
      fetchWithTimeout(INTER_REGULAR_FALLBACK, FONT_FETCH_TIMEOUT_MS).catch(
        () => null,
      ),
    ]);
    if (!bold || !regular) {
      throw new Error("Both Geist and Inter font fetches failed");
    }
    cachedFonts = { bold, regular, family: "Inter" };
  }
  return cachedFonts;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title");
  const subtitle = searchParams.get("subtitle") ?? "";
  const accent = searchParams.get("accent") ?? "#f59e0b";

  if (!title) {
    return NextResponse.json({ error: "title is required" }, { status: 400 });
  }

  const fonts = await loadFonts();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "72px",
          background: "#0a0a0a",
          color: "#fafafa",
          fontFamily: fonts.family,
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)",
          backgroundSize: "24px 24px",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 18,
            color: "#a1a1aa",
            fontFamily: "monospace",
            letterSpacing: "0.06em",
          }}
        >
          aldirifai.com
        </div>

        <div
          style={{
            marginTop: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            maxWidth: "1000px",
          }}
        >
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </div>
          {subtitle ? (
            <div
              style={{
                fontSize: 28,
                color: "#a1a1aa",
                lineHeight: 1.4,
                fontWeight: 400,
              }}
            >
              {subtitle}
            </div>
          ) : null}
        </div>

        <div
          style={{
            position: "absolute",
            right: 72,
            bottom: 72,
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              width: 72,
              height: 4,
              background: accent,
              borderRadius: 2,
            }}
          />
          <div
            style={{
              width: 12,
              height: 12,
              background: accent,
              borderRadius: 6,
            }}
          />
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: fonts.family, data: fonts.regular, weight: 400, style: "normal" },
        { name: fonts.family, data: fonts.bold, weight: 700, style: "normal" },
      ],
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    },
  );
}

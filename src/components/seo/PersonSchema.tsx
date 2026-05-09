import { SITE_URL } from "@/lib/env";

const PERSON_ID = `${SITE_URL}/#person`;

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": PERSON_ID,
  name: "Muhamad Aldi Rifai",
  alternateName: "Aldi Rifai",
  url: SITE_URL,
  jobTitle: "Senior Backend Engineer",
  email: "mailto:aldirifaiemail@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Gresik",
    addressRegion: "East Java",
    addressCountry: "ID",
  },
  knowsAbout: [
    "Backend Development",
    "Laravel",
    "PHP",
    "Python",
    "FastAPI",
    "Go",
    "Rust",
    "PostgreSQL",
    "MySQL",
    "Redis",
    "Docker",
    "API Design",
    "Cryptography",
  ],
  sameAs: [
    "https://github.com/aldirifai",
    "https://www.linkedin.com/in/aldirifai",
    "https://twitter.com/aldirifai1999",
  ],
};

export function PersonSchema() {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify is sufficient — schema.org JSON-LD is escaped by the
      // browser when injected into a <script> tag of this type.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
    />
  );
}

export const PERSON_SCHEMA_ID = PERSON_ID;

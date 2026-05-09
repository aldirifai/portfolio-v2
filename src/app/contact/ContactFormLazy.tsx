"use client";

import dynamic from "next/dynamic";
import { ContactFormSkeleton } from "@/components/form/ContactFormSkeleton";

// ssr: false keeps react-hook-form + zod-resolver out of the initial bundle.
// Skeleton renders during SSR and while the chunk loads on the client.
const ContactForm = dynamic(
  () => import("@/components/form/ContactForm").then((m) => m.ContactForm),
  {
    ssr: false,
    loading: () => <ContactFormSkeleton />,
  },
);

export function ContactFormLazy() {
  return <ContactForm />;
}

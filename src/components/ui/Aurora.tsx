import { cn } from "@/lib/cn";

type AuroraProps = {
  className?: string;
};

export function Aurora({ className }: AuroraProps) {
  return (
    <div
      aria-hidden
      className={cn("aurora", className)}
    />
  );
}

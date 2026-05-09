import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f59e0b",
          color: "#0a0a0a",
          fontSize: 18,
          fontWeight: 800,
          letterSpacing: "0.02em",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        AR
      </div>
    ),
    { ...size },
  );
}

import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { getSiteSettings } from "@/lib/content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "Muhammad Saad Zafar — Full Stack Engineer & Werkstudent, Germany";

/**
 * Replaces the /og-image.jpg that every OG and Twitter tag pointed at but which
 * was never actually in public/ — social previews were broken.
 *
 * Colours are the live tokens from app/globals.css. They are repeated as
 * literals because Satori resolves no CSS custom properties.
 */
export default async function OpengraphImage() {
  const site = await getSiteSettings();
  const mark = await readFile(
    join(process.cwd(), "public", "brand", "sz-logo.png"),
  );
  const markSrc = `data:image/png;base64,${mark.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#04060A",
          color: "#EDF0F5",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={markSrc} width={44} height={44} alt="" />
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: 999,
              background: "#00F0FF",
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 82,
              fontWeight: 600,
              letterSpacing: "-0.04em",
              lineHeight: 1.04,
              maxWidth: 940,
            }}
          >
            Full-stack &amp; Web3 engineer who ships.
          </div>
          {/* One interpolation, not three: Satori counts each text node as a
              child and rejects a div with several unless it declares display. */}
          <div
            style={{
              marginTop: 28,
              fontSize: 28,
              color: "#8D94A3",
              maxWidth: 900,
            }}
          >
            {`${site.availability} · ${site.location}`}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid rgba(255,255,255,0.12)",
            paddingTop: 32,
            fontSize: 24,
          }}
        >
          <span style={{ color: "#EDF0F5" }}>{site.name}</span>
          <span
            style={{
              color: "#737B8B",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              fontSize: 20,
            }}
          >
            Next.js · TypeScript · Solidity
          </span>
        </div>
      </div>
    ),
    size,
  );
}

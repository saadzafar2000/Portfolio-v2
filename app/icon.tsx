import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/**
 * The real SZ mark on the canvas tile, matching the logo container in the nav.
 *
 * The source PNG is a white mark on transparency, so it cannot be served as a
 * favicon directly — against a light browser theme it would disappear. It is
 * composited onto #04060A here instead. Generated at build time, which is also
 * why reading from disk is safe.
 */
export default async function Icon() {
  const mark = await readFile(
    join(process.cwd(), "public", "brand", "sz-logo.png"),
  );
  const src = `data:image/png;base64,${mark.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#04060A",
        }}
      >
        {/* Full bleed — the source PNG carries its own padding, so the glyph
            keeps its exact proportions without an added inset or border. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} width={32} height={32} alt="" />
      </div>
    ),
    size,
  );
}

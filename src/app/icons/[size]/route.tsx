import { ImageResponse } from "next/og";

export const runtime = "nodejs";

type IconRouteProps = Readonly<{
  params: Promise<{ size: string }>;
}>;

function getIconSize(value: string) {
  return value === "192" || value === "512" ? Number(value) : null;
}

export async function GET(_: Request, { params }: IconRouteProps) {
  const { size: requestedSize } = await params;
  const size = getIconSize(requestedSize);

  if (!size) {
    return new Response("Not found", { status: 404 });
  }

  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#002d72",
          border: `${Math.round(size * 0.055)}px solid #002d72`,
          color: "#002d72",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          padding: Math.round(size * 0.08),
          width: "100%",
        }}
      >
        <div
          style={{
            alignItems: "center",
            background: "#f5f5f5",
            border: `${Math.round(size * 0.025)}px solid #7ed5d8`,
            borderRadius: Math.round(size * 0.22),
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              alignItems: "center",
              background: "#009ab0",
              borderRadius: "50%",
              color: "#ffffff",
              display: "flex",
              fontSize: Math.round(size * 0.34),
              fontWeight: 900,
              height: Math.round(size * 0.54),
              justifyContent: "center",
              lineHeight: 1,
              width: Math.round(size * 0.54),
            }}
          >
            차
          </div>
          <div
            style={{
              display: "flex",
              fontSize: Math.round(size * 0.1),
              fontWeight: 900,
              letterSpacing: Math.round(size * 0.007),
              marginTop: Math.round(size * 0.06),
            }}
          >
            CAMPUS
          </div>
        </div>
      </div>
    ),
    { height: size, width: size },
  );
}

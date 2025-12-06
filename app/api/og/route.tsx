// app/api/og/route.tsx
import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const title = searchParams.get("title") || "Hakan İspir";
    const description =
        searchParams.get("description") ||
        "Full-Stack Developer & AI Engineer";

    return new ImageResponse(
        (
            <div
                style={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#111",
                    color: "#fff",
                    fontFamily: '"Inter", sans-serif',
                    padding: "60px",
                }}
            >
                <h1
                    style={{
                        fontSize: "60px",
                        fontWeight: 700,
                        marginBottom: "20px",
                        textAlign: "center",
                        lineHeight: 1.2,
                    }}
                >
                    {title}
                </h1>
                <p
                    style={{
                        fontSize: "30px",
                        fontWeight: 400,
                        textAlign: "center",
                        color: "#ccc",
                        lineHeight: 1.5,
                    }}
                >
                    {description}
                </p>
            </div>
        ),
        {
            width: 1200,
            height: 630,
        }
    );
}

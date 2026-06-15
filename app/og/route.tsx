import { ImageResponse } from "next/og";

import { SITE } from "@/constants/site";

const getGeistRegular = async (request: Request) => {
  const res = await fetch(new URL("/fonts/Geist-Regular.ttf", request.url));
  return res.arrayBuffer();
};

const getGeistBold = async (request: Request) => {
  const res = await fetch(new URL("/fonts/Geist-Bold.ttf", request.url));
  return res.arrayBuffer();
};

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? SITE.NAME;
  const description = searchParams.get("description") ?? SITE.DESCRIPTION.SHORT;

  try {
    const [geistRegular, geistBold] = await Promise.all([
      getGeistRegular(request),
      getGeistBold(request),
    ]);

    return new ImageResponse(
      <div tw="flex flex-col h-full w-full bg-white p-[60px] relative overflow-hidden">
        <div tw="flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <span tw="text-[#f5f5f5] text-[200px] font-bold tracking-[-8px] leading-none whitespace-nowrap">
            {SITE.NAME.toLowerCase()}
          </span>
        </div>

        <div tw="flex flex-col gap-[24px]">
          {/* oxlint-disable-next-line next/no-img-element */}
          <img
            src={SITE.AUTHOR.AVATAR}
            alt={SITE.NAME}
            tw="w-20 h-20 rounded-full"
          />

          <div tw="flex flex-col gap-[12px]">
            <span tw="text-black text-[48px] font-bold tracking-[-1.5px] leading-[1.1]">
              {title}
            </span>
            <span tw="text-[#666666] text-[24px] tracking-[-0.3px] leading-[1.4]">
              {description}
            </span>
          </div>
        </div>

        <div tw="flex mt-auto">
          <span tw="text-[#999999] text-[18px] tracking-[0.5px]">
            ( {new URL(SITE.URL).hostname} )
          </span>
        </div>
      </div>,
      {
        fonts: [
          {
            data: geistRegular,
            name: "Geist",
            style: "normal",
            weight: 400,
          },
          {
            data: geistBold,
            name: "Geist",
            style: "normal",
            weight: 700,
          },
        ],
        height: 630,
        width: 1200,
      }
    );
  } catch (error) {
    console.error("Failed to generate OG image:", error);
    return Response.json(
      { error: "Failed to generate OG image" },
      { status: 500 }
    );
  }
};

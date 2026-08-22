import { NextResponse } from "next/server";
import sharp from "sharp";
import { VCard } from "vcard-creator";

import { USER } from "@/constants/user";

export const revalidate = false;
export const dynamic = "force-static";
export const dynamicParams = false;

const convertImageToJpeg = (imageBuffer: Buffer): Promise<Buffer> =>
  sharp(imageBuffer)
    .jpeg({
      mozjpeg: true,
      progressive: true,
      quality: 90,
    })
    .toBuffer();

const getVCardPhoto = async (url: string) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      return null;
    }

    const buffer = Buffer.from(await response.arrayBuffer());
    if (buffer.length === 0) {
      return null;
    }

    const contentType = response.headers.get("Content-Type") ?? "";
    if (!contentType.startsWith("image/")) {
      return null;
    }

    const jpegBuffer = await convertImageToJpeg(buffer);

    return {
      image: jpegBuffer.toString("base64"),
    };
  } catch {
    return null;
  }
};

export const GET = async () => {
  const card = new VCard();

  card
    .addName({ familyName: USER.lastName, givenName: USER.firstName })
    .addAddress(USER.address)
    .addEmail({ address: USER.email })
    .addUrl({ url: USER.website })
    .addCompany({ name: USER.company })
    .addJobtitle(USER.jobTitle);

  const photo = await getVCardPhoto(USER.avatar);
  if (photo) {
    card.addPhoto({ image: photo.image, mime: "JPEG" });
  }

  return new NextResponse(card.toString(), {
    headers: {
      "Content-Disposition": `attachment; filename=${USER.username}-vcard.vcf`,
      "Content-Type": "text/x-vcard",
    },
    status: 200,
  });
};

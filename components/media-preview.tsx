import { cn } from "@/lib/utils";

interface MediaPreviewProps {
  src: string;
  title: string;
  className?: string;
  type?: "video" | "image";
}

const MediaPreview = ({
  src,
  title,
  className,
  type = "image",
}: MediaPreviewProps) => (
  <div
    className={cn(
      "rounded-md border p-1 **:data-[type='video']:aspect-video **:data-[type='image']:aspect-1200/630",
      className
    )}
  >
    <div
      data-type={type}
      className="relative w-full overflow-hidden rounded-sm border border-border select-none"
    >
      {type === "video" && (
        <video
          src={src}
          autoPlay
          muted
          loop
          playsInline
          aria-label={`Preview of ${title}`}
          className="h-full w-full object-cover"
          preload="metadata"
        />
      )}
      {type === "image" && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={title} className="h-full w-full object-cover" />
        </>
      )}
    </div>
  </div>
);

export { MediaPreview };

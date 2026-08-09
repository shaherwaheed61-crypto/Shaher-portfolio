import Image from "next/image";

function captionFromSrc(src: string) {
  const file = src.split("/").pop() ?? "";
  const name = file.replace(/\.[^.]+$/, "");
  return name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function ScrollCarousel({
  images,
  alt
}: {
  images: readonly string[];
  alt: string;
}) {
  return (
    <div className="scrollbar-none -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 md:-mx-10 md:px-10">
      {images.map((src) => (
        <div
          key={src}
          className="group relative aspect-[4/5] w-[70vw] shrink-0 snap-start overflow-hidden rounded-[20px] border border-line sm:w-[38vw] md:w-[26vw] lg:w-[22vw]"
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes="30vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg/85 via-bg/0 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <span className="absolute bottom-4 left-4 right-4 translate-y-2 font-mono text-xs uppercase tracking-[0.06em] text-ink opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            {captionFromSrc(src)}
          </span>
        </div>
      ))}
    </div>
  );
}

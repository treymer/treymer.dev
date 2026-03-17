"use client";

import { useState } from "react";

interface ImageZoomProps {
  src?: string;
  alt?: string;
  [key: string]: unknown;
}

export default function ImageZoom({ src, alt, ...props }: ImageZoomProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <img
        src={src}
        alt={alt}
        {...props}
        onClick={() => setOpen(true)}
        className="mx-auto block max-h-[560px] w-auto cursor-zoom-in rounded-lg"
      />
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <img
            src={src}
            alt={alt}
            className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain shadow-2xl"
          />
        </div>
      )}
    </>
  );
}

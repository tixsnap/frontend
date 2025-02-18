import React from "react";
import Image from "next/image";

export default function ListNotFound({ image }: { image: string }) {
  return (
    <div className="flex items-center justify-center w-full h-screen -mt-36">
      <Image
        alt="not-found"
        src={image}
        width={500}
        priority
        height={500}
        className="w-auto h-auto"
      />
    </div>
  );
}

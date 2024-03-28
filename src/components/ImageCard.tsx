"use client";

import { Photo } from "@/type";
import React, { useState } from "react";
import { BsCloudDownload } from "react-icons/bs";
import { FaRegCopy } from "react-icons/fa6";
import { saveAs } from "file-saver";
import copy from "clipboard-copy";
import { FaCheck } from "react-icons/fa6";

type Props = {
  photo: Photo;
};
const ImageCard = ({ photo }: Props) => {
  //   console.log("Photo", photo);
  return (
    <div className="relative mb-4 transition-all overflow-hidden break-inside-avoid group hover:brightness-125">
      <img
        className="w-auto h-auto max-w-full max-h-full object-contain"
        height={500}
        width={500}
        src={photo.urls.regular}
        alt="image"
      />

      <p className="absolute bottom-2 left-2 z-40 hidden group-hover:block shadow-sm line-clamp-1 text-white">
        {photo.description
          ? photo.description.length <= 120
            ? photo.description
            : photo.description.slice(0, 60) + "..."
          : ""}
      </p>
      <div className="absolute z-40 top-4 right-4 hidden group-hover:block">
        <ImageDownload photo={photo} />
      </div>

      <div className="absolute z-40 top-4 right-14 hidden group-hover:block">
        <ImageCopyLink photo={photo} />
      </div>
    </div>
  );
};

export default ImageCard;

const ImageDownload = ({ photo }: Props) => {
  const downloadImage = async (imageUrl: string, imageName: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      saveAs(blob, `${imageName}.png`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button
      onClick={() => downloadImage(photo.urls.regular, photo.id)}
      className="bg-[#000000]/50 p-2 rounded-full backdrop-opacity-50 backdrop-filter backdrop-blur-md"
    >
      <BsCloudDownload color="#FFFFFF" />
    </button>
  );
};

const ImageCopyLink = ({ photo }: Props) => {
  const [isCopied, setIsCopied] = useState(false);

  const imageUrl = photo.urls.regular;

  const handleCopyToClipboard = async () => {
    try {
      await copy(imageUrl);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy to clipboard", error);
    }
  };

  return (
    <button
      onClick={handleCopyToClipboard}
      className="bg-[#000000]/50 p-2 rounded-full backdrop-opacity-50 backdrop-filter backdrop-blur-md"
    >
      {isCopied ? <FaCheck color="#FFFFFF" /> : <FaRegCopy color="#FFFFFF" />}
    </button>
  );
};

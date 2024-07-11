import React, { useState, useEffect } from "react";
import tauriServices from "../../services/tauriServices";

interface IImageBase64 extends React.ImgHTMLAttributes<HTMLImageElement> {

}

export default function ImageBase64({ src, ...props }: IImageBase64) {
  const [imgSrc, setImgSrc] = useState<string | undefined>();

  useEffect(() => {
    if (!src) return;

    tauriServices.images.loadImage(src)
      .then((data) => setImgSrc(data));

  }, [src]);

  return <img {...props} src={imgSrc} />
}
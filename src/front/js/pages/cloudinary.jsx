import React from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";

export const CloudinaryImage = () => {

  const cld = new Cloudinary({ cloud: { cloudName: "ddvwfbhas" } });

  const myImage = cld.image("Gemini_Generated_Image_jjv5xnjjv5xnjjv5_ilrpl4")
    .format("webp") 
    .resize("");

  return (
    <div>
      <h2>Imagen desde Cloudinary</h2>
      <AdvancedImage cldImg={myImage} />
    </div>
  );
};

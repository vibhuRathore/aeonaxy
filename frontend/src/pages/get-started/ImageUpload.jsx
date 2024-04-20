import { useState } from "react";
import { Camera, ChevronRight } from "react-feather";

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const onFileChange = (evt) => {
    const file = evt.target.files[0];
    setSelectedFile(file);

    const img = new Image();
    img.onload = () => {
      console.log("Valid Image");
      setPreviewUrl(img.src);
    };
    img.onerror = () => {
      console.error("Invalid image");
    };
    img.src = URL.createObjectURL(file);
  };

  return (
    <div className="flex gap-6 items-center">
      <div className="order-2">
        <label
          htmlFor="avatar"
          className="cursor-pointer mb-2 w-min whitespace-nowrap flow-root"
        >
          <p className="text-sm font-semibold rounded-md px-3 py-1 bg-stone-50 outline-stone-300 outline-1 outline-dashed">
            Choose Image
          </p>
          <input
            type="file"
            accept="image/*"
            name="avatar"
            id="avatar"
            onChange={onFileChange}
            className="hidden"
          />
        </label>
        <p className="text-slate-500 text-xs flex items-center">
          <ChevronRight size={12} />
          <span className="font-medium">Your avatar will be publicly visible</span>
        </p>
      </div>
      <div className="order-1 w-44 h-44 bg-stone-50 rounded-full outline-dashed outline-1 outline-stone-300 overflow-hidden flex justify-center items-center">
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Avatar Preview"
            className="object-cover object-center"
          />
        ) : <Camera className="text-slate-500" />}
      </div>
    </div>
  );
};

export default ImageUpload;

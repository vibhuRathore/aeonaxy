const { VITE_CLOUDINARY_CLOUD, VITE_CLOUDINARY_API_KEY } = import.meta.env;

const uploadImage = async (imageFile) => {
  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append("cloud_name", VITE_CLOUDINARY_CLOUD);
  formData.append("api_key", VITE_CLOUDINARY_API_KEY);
  formData.append("upload_preset", "ml_default");

  try {
    const { secure_url, error } = await fetch(
      "https://api.cloudinary.com/v1_1/dnj1n96lz/image/upload",
      {
        headers: {

        },
        mode: "cors",
        method: "POST",
        body: formData,
      }
    ).then((res) => res.json());

    if (error) {
      console.error("Error in uploading image to cloud storage", err.message);
      return "";
    }

    return secure_url;
  } catch (err) {
    console.error("Error in uploading image to cloud storage", err.message);
    return "";
  }
};

export default uploadImage;

import Button from "../../Components/Button";
import UserTypeBox from "./UserTypeBox";
import Explore from "../../assets/explore.png";
import Hire from "../../assets/hire.png";
import Share from "../../assets/share.png";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const { VITE_BACKEND_URL, VITE_CLOUDINARY_CLOUD, VITE_CLOUDINARY_API_KEY } =
  import.meta.env;

const UserTypeChoice = () => {
  const navigate = useNavigate();
  const [isDesigner, setIsDesigner] = useState(false);
  const [isRecruiter, setIsRecruiter] = useState(false);
  const [isExplorer, setIsExplorer] = useState(false);
  const loc = useLocation();
  const { name, username, email, password, image, location } = loc.state || {};

  const handleImageUpload = async (imageFile) => {
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("cloud_name", VITE_CLOUDINARY_CLOUD);
    formData.append("api_key", VITE_CLOUDINARY_API_KEY);
    formData.append("upload_preset", "ml_default");

    try {
      const { secure_url, error } = await fetch(
        "https:/api.cloudinary.com/v1_1/dnj1n96lz/image/upload",
        {
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

  const signUp = async (image_url) => {
    try {
      const { success, data, error } = await fetch(
        `${VITE_BACKEND_URL}/signup`,
        {
          method: "POST",
          mode: "cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            username,
            email,
            password,
            image_url,
            location,
            user_type: []
              .concat(isDesigner ? ["DESIGNER"] : [])
              .concat(isRecruiter ? ["RECRUITER"] : [])
              .concat(isExplorer ? ["EXPLORER"] : []),
          }),
        }
      ).then((res) => res.json());

      if (!success) {
        console.error("Error in sign up api: ", error);
        return false;
      }
      console.log("Confirmation mail sent: ", data);
      return true;
    } catch (err) {
      console.error("Error in sign up api: ", err.message);
      return false;
    }
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();

    const signUpRequest = async () => {
      const imageUrl = await handleImageUpload(image);
      if (imageUrl === "") {
        console.error("Image upload error");
        return false;
      }
      const success = await signUp(imageUrl);
      if (success) {
        console.log("create user success");
      } else {
        console.error("Create user error");
      }
    };

    signUpRequest().then(() => {
      navigate("/confirm-email", { state: { email } });
    });
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="text-center">
        <h3 className="text-3xl font-bold">What brings you to Dribble?</h3>
        <p className="text-slate-700">
          Select the options that best describe you. Don't worry you can explore
          other options later.
        </p>
      </div>

      <form className="w-3/4" onSubmit={handleSubmit}>
        <div className="flex justify-between gap-2">
          <UserTypeBox
            text="I'm a designer looking to share my work"
            name="user_type"
            value="DESIGNER"
            image={Share}
            onChange={(val) => setIsDesigner(val)}
          />
          <UserTypeBox
            text="I'm looking to hire a designer"
            name="user_type"
            value="RECRUITER"
            image={Hire}
            onChange={(val) => setIsRecruiter(val)}
          />
          <UserTypeBox
            text="I'm looking for design inspiration"
            name="user_type"
            value="EXPLORER"
            image={Explore}
            onChange={(val) => setIsExplorer(val)}
          />
        </div>
        <Button type="submit" text="Finish" className="block my-6 mx-auto" />
      </form>
    </div>
  );
};

export default UserTypeChoice;

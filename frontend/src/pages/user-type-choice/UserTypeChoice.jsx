import Button from "../../Components/Button";
import UserTypeBox from "./UserTypeBox";
import Explore from "../../assets/explore.png";
import Hire from "../../assets/hire.png";
import Share from "../../assets/share.png";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import uploadImage from "../../api/uploadImage";
import signUp from "../../api/signUp";

const UserTypeChoice = () => {
  const navigate = useNavigate();
  const [isDesigner, setIsDesigner] = useState(false);
  const [isRecruiter, setIsRecruiter] = useState(false);
  const [isExplorer, setIsExplorer] = useState(false);
  const loc = useLocation();
  const { name, username, email, password, image, location } = loc.state || {};

  const handleSubmit = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();

    const signUpRequest = async () => {
      const image_url = await uploadImage(image);
      if (image_url === "") {
        console.error("Image upload error");
        return false;
      }
      const user_type = []
        .concat(isDesigner ? ["DESIGNER"] : [])
        .concat(isRecruiter ? ["RECRUITER"] : [])
        .concat(isExplorer ? ["EXPLORER"] : []);
      const success = await signUp({
        name,
        username,
        email,
        password,
        image_url,
        location,
        user_type,
      });
      if (success) {
        console.log("create user success");
      } else {
        console.error("Create user error");
        return false;
      }
      return true;
    };

    signUpRequest().then((success) => {
      if (success) navigate("/confirm-email", { state: { email } });
    });
  };

  return (
    <div className="flex flex-col items-center gap-8 mt-14">
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

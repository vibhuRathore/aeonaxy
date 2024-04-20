import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../Components/Button";
import ImageUpload from "./ImageUpload";
import { useState } from "react";

const GetStarted = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userLocation, setUserLocation] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = () => {
    navigate("/choose-user-type", {
      state: {
        ...location.state,
        image,
        location: userLocation,
      },
    });
  };

  const onImageChange = (image, imageUrl) => {
    setImage(image);
  };

  return (
    <div className="w-1/2 my-0 mx-auto">
      <div className="mb-7">
        <h3 className="text-3xl font-bold">
          Welcome! Let's create your profile
        </h3>
        <p className="text-slate-700">
          Let other's get to know you better! You can do these later.
        </p>
      </div>

      <form className="flex flex-col gap-7" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="avatar" className="text-lg font-bold">
            Add an avatar
          </label>
          <ImageUpload onImageChange={onImageChange} />
        </div>
        <div>
          <label label="location" className="text-lg font-bold">
            Add your location
          </label>
          <input
            type="text"
            name="location"
            id="location"
            placeholder="Enter a location"
            className="w-full bg-transparent border-b-2 outline-none py-2"
            value={userLocation}
            onChange={(evt) => setUserLocation(evt.target.value)}
          />
        </div>
        <Button type="submit" text="Next" />
      </form>
    </div>
  );
};

export default GetStarted;

import Button from "../../Components/Button";
import ImageUpload from "./ImageUpload";

const GetStarted = () => {
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
      <form className="flex flex-col gap-7">
        <div>
          <label htmlFor="avatar" className="text-lg font-bold">
            Add an avatar
          </label>
          <ImageUpload />
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
          />
        </div>
        <Button type="submit" text="Next" />
      </form>
    </div>
  );
};

export default GetStarted;

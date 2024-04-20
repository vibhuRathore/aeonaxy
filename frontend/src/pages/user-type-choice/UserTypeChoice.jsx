import Button from "../../Components/Button";
import UserTypeBox from "./UserTypeBox";
import Explore from "../../assets/explore.png";
import Hire from "../../assets/hire.png";
import Share from "../../assets/share.png";

const UserTypeChoice = () => {
  return (
    <div className="flex flex-col items-center gap-8">
      <div className="text-center">
        <h3 className="text-3xl font-bold">What brings you to Dribble?</h3>
        <p className="text-slate-700">
          Select the options that best describe you. Don't worry you can explore
          other options later.
        </p>
      </div>

      <form className="w-3/4">
        <div className="flex justify-between gap-2">
          <UserTypeBox
            text="I'm a designer looking to share my work"
            name="user_type"
            value="DESIGNER"
            image={Share}
          />
          <UserTypeBox
            text="I'm looking to hire a designer"
            name="user_type"
            value="RECRUITER"
            image={Hire}
          />
          <UserTypeBox
            text="I'm looking for design inspiration"
            name="user_type"
            value="EXPLORER"
            image={Explore}
          />
        </div>
        <Button type="submit" text="Finish" className="block my-6 mx-auto" />
      </form>
    </div>
  );
};

export default UserTypeChoice;

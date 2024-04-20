import Form from "./Form";
import Hero from "../../assets/hero.png";

const SignUp = () => {
  return (
    <div className="flex h-screen">
      <div className="flex flex-col gap-10 w-2/5 p-4 bg-amber-200 text-amber-700">
        <p className="text-xl font-mono italic">dribble</p>
        <h3 className="text-3xl font-extrabold">
          Discover the world's top <br /> Designers &amp; Creatives
        </h3>
        <img src={Hero} className="w-full" />
        <p className="text-sm">
          Art by <span className="underline">xyz</span>
        </p>
      </div>
      <div className="grow p-4">
        <div className="w-2/3 mx-auto mt-14">
          <h3 className="text-3xl font-extrabold mb-10">Sign up to Dribble</h3>
          <Form />
        </div>
      </div>
    </div>
  );
};

export default SignUp;

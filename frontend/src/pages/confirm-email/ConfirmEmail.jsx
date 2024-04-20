import { useLocation, useNavigate } from "react-router-dom";
import Email from "../../assets/email.png";
import { useEffect } from "react";

const ConfirmEmail = () => {
  const navigate = useNavigate();
  const loc = useLocation();
  const { email } = loc.state || {};

  useEffect(() => {
    if (!loc.state) {
      navigate("/sign-up", { replace: true });
    }
  }, []);


  return (
    <div className="flex flex-col items-center gap-4 mt-14">
      <h3 className="text-3xl font-bold">Please verify your email...</h3>
      <img src={Email} className="w-44 h-44 object-contain" />
      <p className="text-slate-700">
        Please verify your email address. We've sent confirmation mail to:
      </p>
      <p className="font-bold">{email || "placeholder@example.com"}</p>
      <p className="text-slate-700">
        Click on the link it that email and begin using dribble.
      </p>
    </div>
  );
};

export default ConfirmEmail;

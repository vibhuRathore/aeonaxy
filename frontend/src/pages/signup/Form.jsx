import { useState } from "react";
import Input from "./Input";
import Button from "../../Components/Button";

const Form = () => {
  const [name, setName] = useState({ value: "", error: "" });
  const [username, setUsername] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("handle submit");

    const usernameRegex = /^[a-zA-Z0-9_.-]$/;
    const emailRegex = /[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/;
    if (name.value === "") {
      setName({ ...name, error: "Name must not be empty" });
    }

    if (username.value === "") {
      setUsername({ ...username, error: "Username must not be empty" });
    } else if (usernameRegex.test(username.value)) {
      setUsername({
        ...username,
        error: "Username should contain letter, numbers, _, ., and -",
      });
    }

    if (email.value === "") {
      setEmail({ ...email, error: "Email must not be empty" });
    } else if (emailRegex.test(email)) {
      setEmail({ ...email, error: "Email must be valid" });
    }

    if (password.value.length < 8) {
      setPassword({
        ...password,
        error: "Password must contain at least 8 characters",
      });
    }
  };

  return (
    <form
      action="/signup"
      method="POST"
      className="flex flex-col gap-2"
      onSubmit={handleSubmit}
    >
      <div className="flex gap-2">
        <Input
          label="Name"
          error={name.error}
          name="name"
          type="text"
          value={name.value}
          onChange={(e) => setName({ ...name, value: e.target.value })}
        />
        <Input
          label="Username"
          error={username.error}
          name="username"
          type="text"
          value={username.value}
          onChange={(e) => setUsername({ ...username, value: e.target.value })}
        />
      </div>
      <Input
        label="Email"
        error={email.error}
        name="email"
        type="email"
        value={email.value}
        onChange={(e) => setEmail({ ...email, value: e.target.value })}
      />
      <Input
        label="Password"
        error={password.error}
        name="password"
        type="password"
        value={password.value}
        onChange={(e) => setPassword({ ...password, value: e.target.value })}
      />
      {/* <button
        type="submit"
        className="self-start bg-pink-400 text-white font-bold px-8 py-2 rounded-md"
      >
        Create Account
      </button> */}
      <Button text="Create Account" type="submit" className="self-start" />
    </form>
  );
};

export default Form;

import { useState } from "react";
import Input from "./Input";
import Button from "../../Components/Button";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const [name, setName] = useState({ value: "", error: "" });
  const [username, setUsername] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

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

    if (
      name.error === "" &&
      username.error === "" &&
      email.error === "" &&
      password.error === ""
    ) {
      navigate("/get-started", {
        name: name.value,
        username: username.value,
        email: email.value,
        password: password.value,
      });
    }
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
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
      <Button text="Create Account" type="submit" className="self-start" />
    </form>
  );
};

export default Form;

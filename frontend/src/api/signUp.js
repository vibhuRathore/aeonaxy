const { VITE_BACKEND_URL } = import.meta.env;

const signUp = async ({
  name,
  username,
  email,
  password,
  image_url,
  location,
  user_type,
}) => {
  try {
    const { success, data, error } = await fetch(`${VITE_BACKEND_URL}/signup`, {
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
        user_type,
      }),
    }).then((res) => res.json());

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

export default signUp;

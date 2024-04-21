const { pbkdf2Sync, randomBytes } = require("crypto");

const getUserWithHashedPassword = (user, secret) => {
  const password_hash = pbkdf2Sync(
    user.password,
    secret,
    1000,
    64,
    `sha512`
  ).toString(`hex`);

  const tempUser = {
    ...user,
    password_hash,
  };
  delete tempUser.password;
  return tempUser;
};

const generateRandomToken = () => {
  const BYTES_COUNT = 32;
  return randomBytes(BYTES_COUNT).toString("hex");
};

module.exports = {
  generateRandomToken,
  getUserWithHashedPassword,
};

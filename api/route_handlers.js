require("dotenv").config();
const { URL } = require("url");
const database = require("./database");
const { userSchema } = require("./user_schema");
const {
  generateRandomToken,
  getUserWithHashedPassword,
} = require("./encryption");
const { sendVerificationMail } = require("./sendVerificationMail");
const { HASH_SECRET, SERVER_ADDRESS } = process.env;

const createVerificationLink = (username, token) => {
  try {
    const url = new URL("/verify", SERVER_ADDRESS);
    url.searchParams.set("username", username);
    url.searchParams.set("token", token);
    return url.toString();
  } catch (err) {
    console.log(
      `ServerError: unable to create verification link: ${err.message}`
    );
    return "";
  }
};

const signup = async (req, res) => {
  try {
    const { success, data, error } = await userSchema.safeParseAsync(req.body);
    if (success !== true) {
      res.status(400).json({ success: false, error });
      return;
    }

    const isUsernameAvailable = await database.checkUsernameAvailable(
      data.username
    );
    if (!isUsernameAvailable) {
      res
        .status(200)
        .json({ success: false, error: { name: "Username not available" } });
      return;
    }

    const token = generateRandomToken();
    const userToSave = getUserWithHashedPassword(data, HASH_SECRET);
    const savedToDb = await database.addUserToUnverifiedTable(
      userToSave,
      token
    );
    if (!savedToDb) {
      throw new Error("failed to save unverified user in database");
    }

    const verifyLink = createVerificationLink(userToSave.username, token);
    if (verifyLink.length === 0) {
      throw new Error("failed to create verification link");
    }

    const emailSentSuccess = sendVerificationMail(userToSave.email, verifyLink);
    if (!emailSentSuccess) {
      throw new Error("failed to send verification mail");
    }

    res.status(200).json({ success: true });

    console.log(`Success: Sent verification mail to ${userToSave.email}`);
  } catch (err) {
    console.error(`ServerError: cannot signup: ${err.message}`);
    res
      .status(500)
      .send({ success: false, error: { name: "Internal Server Error!" } });
  }
};

const verify = async (req, res) => {
  try {
    const { username, token: queryToken } = req.query;
    const fetchResult = await database.fetchUserToUnverifiedTable(username);
    if (fetchResult === null) {
      fetchResult
        .status(400)
        .json({ success: false, error: "Invalid verification url" });
      return;
    }

    const { expiration, token: dbToken, ...user } = fetchResult;
    if (queryToken !== dbToken) {
      res
        .status(400)
        .json({ success: false, error: "Invalid verification url" });
      return;
    }

    const expirationDate = new Date(expiration);
    if (expirationDate < new Date()) {
      res
        .status(400)
        .json({ success: false, error: "Verification url is expired" });
      return;
    }

    const addSuccess = await database.addUserToTable(user);
    if (!addSuccess) {
      throw new Error(
        `error adding user to database. user ${JSON.stringify(user)}`
      );
    }

    const deleteSuccess = await database.deleteUserFromUnverifiedTable(
      username
    );
    if (!deleteSuccess) {
      console.error(
        `DatabaseError: Unable to delete from unverified_table. username=${username}`
      );
    }

    res.status(200).json({ success: true, data: "User verification success" });
  } catch (err) {
    console.error(`ServerError: unable to verify. ${err.message}`);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

const notFound = (req, res) => {
  res.status(404).json({ success: false, error: { name: "Not Found!" } });
};

module.exports = {
  notFound,
  signup,
  verify,
};

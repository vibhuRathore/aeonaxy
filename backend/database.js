const postgres = require("postgres");
require("dotenv").config();

const { PG_HOST, PG_DATABASE, PG_USER, PG_PASSWORD, ENDPOINT_ID } = process.env;

const sql = postgres({
  host: PG_HOST,
  database: PG_DATABASE,
  username: PG_USER,
  password: PG_PASSWORD,
  port: 5432,
  ssl: "require",
  connection: {
    options: `project=${ENDPOINT_ID}`,
  },
});

const dropUserTable = async () => {
  try {
    const dropTableResult = await sql`DROP TABLE IF EXISTS users`;
    console.log(`Drop user table: ${JSON.stringify(dropTableResult)}`);
  } catch (err) {
    console.err(`DatabaseError: ${err.message}`);
  }
};

const createUserTypeEnum = async () => {
  try {
    const createEnumResult =
      await sql`CREATE TYPE user_type AS ENUM ('${USER_TYPE.designer}', '${USER_TYPE.explorer}', '${USER_TYPE.recruiter}')`;
    console.log(`Create enum: ${createEnumResult}`);
  } catch (err) {
    console.error(
      `DatabaseError: cannot create user type enum: ${err.message}`
    );
  }
};

const createUserTable = async () => {
  try {
    const createTableResult = await sql`
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR NOT NULL,
            username VARCHAR UNIQUE NOT NULL,
            email VARCHAR NOT NULL,
            password_hash VARCHAR NOT NULL,
            image_url VARCHAR,
            location VARCHAR,
            user_type user_type[]
        )`;

    console.log(`Create table: ${createTableResult}`);
  } catch (err) {
    console.error(`ERR: ${JSON.stringify(err)}`);
  }
};

const dropUnverifiedUsersTable = async () => {
  try {
    const dropTableResult = await sql`DROP TABLE IF EXISTS unverified_users`;
    console.log(`Drop user table: ${JSON.stringify(dropTableResult)}`);
  } catch (err) {
    console.err(`DatabaseError: ${err.message}`);
  }
}

const createUnverifiedUsersTable = async () => {
  try {
    const createTableResult = await sql`
        CREATE TABLE IF NOT EXISTS unverified_users (
            name VARCHAR NOT NULL,
            username VARCHAR UNIQUE NOT NULL,
            email VARCHAR NOT NULL,
            password_hash VARCHAR NOT NULL,
            image_url VARCHAR,
            location VARCHAR,
            user_type user_type[],
            expiration VARCHAR NOT NULL,
            token VARCHAR NOT NULL
        )`;

    console.log(`Create table: ${createTableResult}`);
  } catch (err) {
    console.error(
      `DatabaseError: cannot create unverified user table: ${err.message}`
    );
  }
};

const addUserToUnverifiedTable = async (user, token) => {
  const tableColumns = [
    "name",
    "username",
    "email",
    "password_hash",
    "image_url",
    "location",
    "user_type",
    "expiration",
    "token",
  ];
  const EXPIRATION_DURATION = 30 * 60 * 1000; // milliseconds

  try {
    const userToSave = {
      ...user,
      token,
      expiration: new Date(new Date().getTime() + EXPIRATION_DURATION).toISOString(),
    };

    await sql`INSERT INTO unverified_users ${sql(
      userToSave,
      tableColumns
    )}`;
  } catch (err) {
    console.log(`DatabaseError: createUnverifiedUsersTable: ${err}`);
    return false;
  }
  return true;
};

const deleteUserFromUnverifiedTable = async (username) => {
  try {
    const deleteResult =
      await sql`DELETE FROM unverified_users WHERE username = ${username}`;
  } catch (err) {
    console.log(`DatabaseError: deleteUserFromUnverifiedTable: ${err}`);
    return false;
  }
  return true;
};

const fetchUserToUnverifiedTable = async (username) => {
  try {
    const result =
      await sql`SELECT * FROM unverified_users WHERE username = ${username}`;
    return result[0];
  } catch (err) {
    console.log(`DatabaseError: fetchUserToUnverifiedTable: ${err}`);
  }
  return null;
};

const addUserToTable = async (user) => {
  const tableColumns = [
    "name",
    "username",
    "email",
    "password_hash",
    "image_url",
    "location",
    "user_type",
  ];

  try {
    await sql`INSERT INTO users ${sql(
      user,
      tableColumns
    )}`;
  } catch (err) {
    console.log(`DatabaseError: addUserToTable: ${err}`);
    return false;
  }
  return true;
};

const checkUsernameAvailable = async (username) => {
  try {
    let result = await sql`
    SELECT COUNT(username)
    FROM users
    WHERE username = ${username}`;
    if (result.length > 0 && result[0].count !== "0") return false;

    result = await sql`
    SELECT COUNT(username)
    FROM unverified_users
    WHERE username = ${username}`;
    if (result.length > 0 && result[0].count !== "0") return false;
  } catch (err) {
    console.error(
      `DatabaseError: cannot search for username(${username}): ${err.message}`
    );
    return false;
  }
  return true;
};

module.exports = {
  addUserToTable,
  addUserToUnverifiedTable,
  checkUsernameAvailable,
  createUnverifiedUsersTable,
  createUserTable,
  createUserTypeEnum,
  deleteUserFromUnverifiedTable,
  dropUnverifiedUsersTable,
  dropUserTable,
  fetchUserToUnverifiedTable,
};

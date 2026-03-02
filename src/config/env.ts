import dotenv from 'dotenv';
dotenv.config();

export const {
  // APP Config
  PORT,
  DB_URI,
  CLIENT_URL,

  // Hash
  SALT_ROUNDS,

  // Random String
  RANDOM_STRING_LENGTH,

  // JWT
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  JWT_ACCESS_EXPIRES,
  JWT_REFRESH_EXPIRES,

  // Google
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL,
} = {
  // APP Config
  PORT: process.env.PORT ?? 3001,
  CLIENT_URL: process.env.CLIENT_URL,
  DB_URI: process.env.DB_URI,

  // Hash
  SALT_ROUNDS: process.env.SALT_ROUNDS,

  // Random String
  RANDOM_STRING_LENGTH: process.env.RANDOM_STRING_LENGTH,

  // JWT
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES,
  JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES,

  // Google
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,
};

import dotenv from 'dotenv';
dotenv.config();

export const {
  PORT,
  DB_URI,
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  JWT_ACCESS_EXPIRES,
  JWT_REFRESH_EXPIRES,
} = {
  PORT: process.env.PORT ?? 3001,
  DB_URI: process.env.DB_URI,
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES,
  JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES,
};

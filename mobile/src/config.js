import dotenv from "dotenv";
dotenv.config();

const ENV = process.env.NODE_ENV || "DEV";
const domains = {
  DEV: process.env.DEV_DOMAIN,
  STAGING: process.env.STAGING_DOMAIN,
  PROD: process.env.PROD_DOMAIN,
};

export const BASE_URL = `http://${domains[ENV]}:${process.env.PORT}`;

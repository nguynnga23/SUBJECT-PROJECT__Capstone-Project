import { APP_ENV, DEV_DOMAIN, STAGING_DOMAIN, PROD_DOMAIN, PORT } from "@env";
console.log(APP_ENV, DEV_DOMAIN, STAGING_DOMAIN, PROD_DOMAIN, PORT);
export const ENV = APP_ENV;
export const domains = {
  DEV: DEV_DOMAIN,
  STAGING: STAGING_DOMAIN,
  PROD: PROD_DOMAIN,
};

export const BASE_URL = `http://192.168.5.74:8080/v1`;
console.log(BASE_URL);

import { APP_ENV, DEV_DOMAIN, STAGING_DOMAIN, PROD_DOMAIN, PORT } from "@env";
console.log(APP_ENV, DEV_DOMAIN, STAGING_DOMAIN, PROD_DOMAIN, PORT);
export const ENV = APP_ENV;
export const domains = {
  DEV: DEV_DOMAIN,
  STAGING: STAGING_DOMAIN,
  PROD: PROD_DOMAIN,
};

export const BASE_URL = `http://172.28.41.216:8080/v1`;
console.log(BASE_URL);

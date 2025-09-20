const ENV = "DEV";

// Khai báo domain cho từng môi trường
const domains = {
  DEV: "192.168.40.103",
  STAGING: "staging.myapp.com",
  PROD: "api.myapp.com",
};
export const host = 8080;
// Tự động lấy domain theo ENV
export const domain = domains[ENV];

// Tạo BASE_URL
export const BASE_URL = `http://${domain}:${host}`;

import type { StrapiApp } from "@strapi/strapi/admin";

export default {
  config: {
    translations: {
      en: {
        "Auth.form.welcome.title": "Chào mừng đến với CMS của", // Thay đổi ở màn hình đăng nhập
        "app.components.HomePage.welcome":
          "Chào mừng bạn đến với hệ thống quản trị nội dung", // Thay đổi ở dashboard
      },
    },
    locales: [
      // 'ar',
      // 'fr',
      // 'cs',
      // 'de',
      // 'dk',
      // 'es',
      // 'he',
      // 'id',
      // 'it',
      // 'ja',
      // 'ko',
      // 'ms',
      // 'nl',
      // 'no',
      // 'pl',
      // 'pt-BR',
      // 'pt',
      // 'ru',
      // 'sk',
      // 'sv',
      // 'th',
      // 'tr',
      // 'uk',
      // 'vi',
      // 'zh-Hans',
      // 'zh',
    ],
  },
  bootstrap(app: StrapiApp) {
    console.log(app);
  },
};

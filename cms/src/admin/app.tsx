import type { StrapiApp } from "@strapi/strapi/admin";

export default {
  register() {
    const style = document.createElement('style');
    style.innerHTML = `
      /* Ẩn link Marketplace ở sidebar (bao gồm basePath /admin) */
      a[href="/marketplace"],
      a[href="/admin/marketplace"] { display: none !important; }
      // a[href="/plugins/content-type-builder"],
      // a[href="/admin/plugins/content-type-builder"] {
      //   display: none !important;
      }
    `;
    document.head.appendChild(style);
  },
  config: {
    translations: {
      en: {
        "Auth.form.welcome.title": "Welcome to Unifeed!", // Thay đổi ở màn hình đăng nhập
        "Auth.form.welcome.subtitle":
          "Log in to your account", // Thay đổi ở dashboard
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

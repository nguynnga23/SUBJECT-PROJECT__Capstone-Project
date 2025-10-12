const users = [
  {
    role: {
      name: "Public",
    },
    username: "Huy Nguyen",
    email: "huynguyen@gmail.com",
    class: "DHKTPM17B",
    confirmed: true,
    blocked: false,
    phone: "0834784472",
    studentID: "21128101",
    department: {
      department_name: "Khoa Công Nghệ Thông Tin IUH",
    },
    avatar: {
      url: "http://localhost:1337/uploads/images_e7f3510546.jpg",
    },
    createdAt: "2025-10-12T05:27:21.462Z",
    updatedAt: "2025-10-12T05:43:17.144Z",
  },
  {
    role: {
      name: "Authenticated",
    },
    username: "Nga Nguyen",
    email: "nganguyen@gmail.com",
    class: "DHKTPM17C",
    confirmed: true,
    blocked: false,
    phone: "0334784472",
    studentID: "21130791",
    department: {
      department_name: "Khoa Công Nghệ Thông Tin IUH",
    },
    avatar: {
      url: "http://localhost:1337/uploads/images_1_122b08ae9f.jpg",
    },
    createdAt: "2025-10-12T05:28:15.078Z",
    updatedAt: "2025-10-12T06:06:23.112Z",
  },
];

const articles = [
  {
    id: 1,
    thumbnail: "https://iuh.edu.vn/templates/2015/image/img_default.png",
    title:
      "Thông báo v/v thi sát hạch Tiếng Anh đầu vào đối với sinh viên khóa 20 và khóa 21",
    summary: "",
    content:
      "[ Tải về và Xem ](http://localhost:1337/uploads/TB_1769_2025_95c406cb83.pdf)\n\n",
    external_url:
      "https://iuh.edu.vn/vi/thong-bao-fi20/thong-bao-v-v-thi-sat-hach-tieng-anh-dau-vao-doi-voi-sinh-vien-khoa-20-va-khoa-21-a2583.html",
    external_slug:
      "thong-bao-v-v-thi-sat-hach-tieng-anh-dau-vao-doi-voi-sinh-vien-khoa-20-va-khoa-21-a2583.html",
    external_publish_date: "2025-09-25",
    publishedAt: "2025-09-27T01:21:14.108Z",
    createdAt: "2025-09-27T01:21:14.093Z",
    category: {
      category_name: "THÔNG BÁO SINH VIÊN",
      department_source: {
        label: "Trang Thông Tin Chính Thức IUH",
      },
    },
  },
  {
    id: 2,
    thumbnail: "https://fit.iuh.edu.vn/upload/images/img_default.png",
    title: "Lịch thi Giữa kỳ HK1/2025-2026 từ ngày 06/10/2025 đến 12/10/2025",
    summary: "",
    content:
      "Lịch thi Giữa kỳ HK1/2025-2026 từ [ngày 06/10/2025 đến\n12/10/2025](http://localhost:1337/uploads/Lich_thi_GK_HK_1_2025_2026_tu_06_10_den_12_10_db46618a7e.xls)\n\nSV chú ý theo dõi lịch thi thường xuyên trên [trang của sinh\nviên](http://sv.iuh.edu.vn/).\n\nNếu có vấn đề thắc mắc liên quan đến môn học hoặc đánh giá, điểm thành phần,\nSV liên hệ cho GV giảng dạy.\n\nCác phản ánh khác sinh viên liên hệ Khoa CNTT qua email:\n**FIT_IUH@iuh.edu.vn**\n\n",
    external_url:
      "https://fit.iuh.edu.vn/news.html@detail@155@3465@Lich-thi-Giua-ky-HK1-2025-2026-tu-ngay-06-10-2025-den-12-10-2025",
    external_slug:
      "news.html@detail@155@3465@Lich-thi-Giua-ky-HK1-2025-2026-tu-ngay-06-10-2025-den-12-10-2025",
    external_publish_date: "2025-09-25",
    publishedAt: null,
    createdAt: "2025-09-27T02:22:35.774Z",
    category: {
      category_name: "THÔNG BÁO SINH VIÊN",
      department_source: {
        label: "Khoa Công Nghệ Thông Tin",
      },
    },
  },
  {
    id: 3,
    thumbnail: "https://fit.iuh.edu.vn/upload/images/img_default.png",
    title: "Lịch thi Giữa kỳ HK1/2025-2026 từ ngày 22/9/2025 đến 05/10/2025",
    summary: "",
    content:
      "Lịch thi Giữa kỳ HK1/2025-2026 từ ngày [22/9/2025 đến\n28/9/2025](http://localhost:1337/uploads/Lich_thi_GK_HK_1_2025_2026_tu_22_09_den_28_09_61777703fb.xls)\n\nLịch thi Giữa kỳ HK1/2025-2026 từ ngày [29/9/2025 đến\n05/10/2025](http://localhost:1337/uploads/Lich_thi_GK_HK_1_2025_2026_tu_29_09_den_05_10_3e08a35c28.xls)\n\nSV chú ý theo dõi lịch thi thường xuyên trên [trang của sinh\nviên](http://sv.iuh.edu.vn/).\n\nNếu có vấn đề thắc mắc liên quan đến môn học hoặc đánh giá, điểm thành phần,\nSV liên hệ cho GV giảng dạy.\n\nCác phản ánh khác sinh viên liên hệ Khoa CNTT qua email:\n**FIT_IUH@iuh.edu.vn**\n\n",
    external_url:
      "https://fit.iuh.edu.vn/news.html@detail@155@3462@Lich-thi-Giua-ky-HK1-2025-2026-tu-ngay-22-9-2025-den-05-10-2025",
    external_slug:
      "news.html@detail@155@3462@Lich-thi-Giua-ky-HK1-2025-2026-tu-ngay-22-9-2025-den-05-10-2025",
    external_publish_date: "2025-09-15",
    publishedAt: "2025-09-27T02:22:36.706Z",
    createdAt: "2025-09-27T02:22:36.692Z",
    category: {
      category_name: "THÔNG BÁO SINH VIÊN",
      department_source: {
        label: "Khoa Công Nghệ Thông Tin",
      },
    },
  },
];

const current_data = {
  id: 1,
  department_name: "Khoa Công Nghệ Thông Tin IUH",
  department_sources: [
    {
      id: 1,
      categories: [
        {
          id: 1,
          category_name: "TIN TỨC - SỰ KIỆN",
          category_url: "https://fit.iuh.edu.vn/news.html@102@Tin-tuc-su-kien",
          last_external_publish_date: "2025-09-15",
        },
        {
          id: 2,
          category_name: "THÔNG BÁO SINH VIÊN",
          category_url: "https://fit.iuh.edu.vn/news.html@155@Thong-bao",
          last_external_publish_date: "2025-09-15",
        },
        {
          id: 3,
          category_name: "THÔNG TIN TUYỂN SINH",
          category_url:
            "https://fit.iuh.edu.vn/news.html@157@Thong-tin-tuyen-sinh",
          last_external_publish_date: "2025-09-15",
        },
        {
          id: 4,
          category_name: "THỰC TẬP TUYỂN DỤNG",
          category_url:
            "https://fit.iuh.edu.vn/news.html@104@Tuyen-dung-chuyen-nganh",
          last_external_publish_date: "2025-09-15",
        },
      ],
      url: "https://fit.iuh.edu.vn/",
      label: "Khoa Công Nghệ Thông Tin",
      crawler_config: {
        title:
          "body > div.page-content > div.container > div.content-bottom > div > div > div.col-md-9.page-left > div.page-title ::text",
        content:
          "body > div.page-content > div.container > div.content-bottom > div > div > div.col-md-9.page-left > div.left-content > div",
        external_publish_date: "div.content-info.col-sm-9 > span ::text",
        next_pages: ".pagination > .number::attr(href)",
        relative_url: ".content-img a ::attr(href)",
        relative_url_list: ".content",
        thumbnail: ".content-img img::attr(src)",
      },
      schedule_config: {
        value: 1,
        type: "HOURS",
      },
      updatedAt: "2025-09-15T14:15:31.629Z",
      createdAt: "2025-09-15T14:12:07.651Z",
    },
    {
      id: 2,
      categories: [
        {
          id: 5,
          category_name: "TIN TỨC - SỰ KIỆN",
          category_url: "https://pdt.iuh.edu.vn/category/tin-tuc-su-kien/",
          last_external_publish_date: "2025-09-15",
        },
      ],
      url: "https://pdt.iuh.edu.vn",
      label: "Phòng Đào Tạo ",
      crawler_config: null,
      updatedAt: "2025-09-15T14:18:12.255Z",
      createdAt: "2025-09-15T14:18:12.255Z",
    },
    {
      id: 3,
      categories: [
        {
          id: 6,
          category_name: "HOẠT ĐỘNG PHONG TRÀO",
          category_url:
            "https://ctsv.iuh.edu.vn/news.html@211@Hoat-dong-phong-trao",
          last_external_publish_date: "2025-09-15",
        },
      ],
      url: "https://ctsv.iuh.edu.vn/",
      label: "Phòng Công Tác Chính Trị Và Hỗ Trợ Sinh Viên",
      crawler_config: null,
      updatedAt: "2025-09-15T14:21:53.219Z",
      createdAt: "2025-09-15T14:20:19.751Z",
    },
    {
      id: 4,
      categories: [
        {
          id: 7,
          category_name: "THÔNG BÁO SINH VIÊN",
          category_url: "https://iuh.edu.vn/vi/thong-bao-fi20",
          last_external_publish_date: "2025-09-15",
        },
        {
          id: 8,
          category_name: "TIN TỨC - SỰ KIỆN",
          category_url: "https://iuh.edu.vn/vi/tin-tuc-su-kien-fi11",
          last_external_publish_date: "2025-09-15",
        },
        {
          id: 9,
          category_name: "THÔNG TIN TUYỂN SINH",
          category_url: "https://iuh.edu.vn/vi/tuyen-sinh-fi16",
          last_external_publish_date: "2025-09-15",
        },
        {
          id: 10,
          category_name: "HỢP TÁC QUỐC TẾ",
          category_url: "https://iuh.edu.vn/vi/hop-tac-quoc-te-fi12",
          last_external_publish_date: "2025-09-15",
        },
      ],
      url: "https://iuh.edu.vn",
      label: "Trang Thông Tin Chính Thức IUH",
      crawler_config: {
        title:
          "#page-content > div > div > div > div.article-detail.col-md-9 > div.content > h1 ::text",
        content:
          "#page-content > div > div > div > div.article-detail.col-md-9 > div.content > div.divNewsDetail",
        external_publish_date: "div.content-info.col-sm-9 > span ::text",
        next_pages: ".pagination > .number::attr(href)",
        relative_url: ".content-img a ::attr(href)",
        relative_url_list: ".content",
        thumbnail: ".content-img img::attr(src)",
      },
      schedule_config: {
        value: 6,
        type: "HOURS",
      },
      updatedAt: "2025-09-15T14:27:43.576Z",
      createdAt: "2025-09-15T14:06:56.534Z",
    },
  ],
};

export { users, articles, current_data };

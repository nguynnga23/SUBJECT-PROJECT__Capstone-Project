import { thumnailDefault } from "../assets";
import {
  picture1,
  picture2,
  picture3,
  picture4,
  picture5,
  picture6,
} from "../assets";

const user = {
  name: "Huy Nguyễn",
  avatar: "https://i.pravatar.cc/40",
};

const list = [
  {
    title: "Tuyển Sinh Khóa Học Miễn Phí AOTS",
    description:
      "Khóa Học Miễn Phí AOTS Do Tổ Chức Phi Lợi Nhuận Tại Nhật Bản Tổ Chức. Được Giảng Dạy Bởi Các Chuyên Gia CNTT Đến Từ Các Công Ty Nhật Bản.",
    thumbnail: thumnailDefault,
    publishDate: "July 14, 2025",
  },
  {
    title: "TB1. Thông Báo Kế Hoạch Pretest",
    description:
      "1. Kế Hoạch Pretest Đợt Tháng 7.2025 (Dành Cho SV Đã Học Khóa 15, 16, 17 Tích Lũy >= 115)...",
    thumbnail: thumnailDefault,
    publishDate: "July 14, 2025",
  },
  {
    title: "Thông Báo Lịch Thi Bổ Sung Kết Thúc Học Phần",
    description:
      "Thông Tin Thời Gian Thi Bổ Sung Cho Các SV Học Kỳ Hè 2024-2025",
    thumbnail: thumnailDefault,
    publishDate: "July 14, 2025",
  },
  {
    title: "Thông Báo Lịch Thi Bổ Sung Kết Thúc Học Phần",
    description:
      "Thông Tin Thời Gian Thi Bổ Sung Cho Các SV Học Kỳ Hè 2024-2025...",
    thumbnail: thumnailDefault,
    publishDate: "July 14, 2025",
  },
  {
    title: "TB1. Thông Báo Kế Hoạch Pretest",
    description:
      "1. Kế Hoạch Pretest Đợt Tháng 7.2025 (Dành Cho SV Đã Học Khóa 15, 16, 17 Tích Lũy >= 115)...",
    thumbnail: thumnailDefault,
    publishDate: "July 14, 2025",
  },
  {
    title: "Thông Báo Lịch Thi Bổ Sung Kết Thúc Học Phần",
    description:
      "Thông Tin Thời Gian Thi Bổ Sung Cho Các SV Học Kỳ Hè 2024-2025...",
    thumbnail: thumnailDefault,
    publishDate: "July 14, 2025",
  },
  {
    title: "TB1. Thông Báo Kế Hoạch Pretest",
    description:
      "1. Kế Hoạch Pretest Đợt Tháng 7.2025 (Dành Cho SV Đã Học Khóa 15, 16, 17 Tích Lũy >= 115)...",
    thumbnail: thumnailDefault,
    publishDate: "July 14, 2025",
  },
];

const departments = [
  {
    name: "Trang thông tin chính thức",
    info: {
      number: "0283 8940 390",
      location:
        "Lầu 1 Nhà H - 12 Nguyễn Văn Bảo, Phường 1, Quận Gò Vấp, Tp. HCM",
      website: "fit.iuh.edu.vn",
      email: "ketnoi.fit@iuh.edu.vn",
    },
    bannerSliderList: [
      picture1,
      picture2,
      picture3,
      picture4,
      picture5,
      picture6,
    ],
    categories: [
      { name: "Tin tức sự kiện", list: list },
      { name: "Thông báo sinh viên", list: list },
      { name: "Thông tin tuyển dụng", list: list },
      { name: "Thông tin tuyển sinh", list: list },
    ],
  },
  {
    name: "Khoa Công Nghệ Thông Tin",
    info: {
      number: "0283 8940 390",
      location:
        "Lầu 1 Nhà H - 12 Nguyễn Văn Bảo, Phường 1, Quận Gò Vấp, Tp. HCM",
      website: "fit.iuh.edu.vn",
      email: "ketnoi.fit@iuh.edu.vn",
    },
    bannerSliderList: [
      picture1,
      picture2,
      picture3,
      picture4,
      picture5,
      picture6,
    ],
    categories: [
      { name: "Tin tức sự kiện", list: list },
      { name: "Thông báo sinh viên", list: list },
    ],
  },
  {
    name: "Phòng đào tạo",
    info: {
      number: "0283 8940 390",
      location:
        "Lầu 1 Nhà H - 12 Nguyễn Văn Bảo, Phường 1, Quận Gò Vấp, Tp. HCM",
      website: "fit.iuh.edu.vn",
      email: "ketnoi.fit@iuh.edu.vn",
    },
    bannerSliderList: [
      picture1,
      picture2,
      picture3,
      picture4,
      picture5,
      picture6,
    ],
    categories: [
      { name: "Tin tức sự kiện", list: list },
      { name: "Thông báo sinh viên", list: list },
    ],
  },
  {
    name: "Phòng công tác sinh viên",
    info: {
      number: "0283 8940 390",
      location:
        "Lầu 1 Nhà H - 12 Nguyễn Văn Bảo, Phường 1, Quận Gò Vấp, Tp. HCM",
      website: "fit.iuh.edu.vn",
      email: "ketnoi.fit@iuh.edu.vn",
    },
    bannerSliderList: [
      picture1,
      picture2,
      picture3,
      picture4,
      picture5,
      picture6,
    ],
    categories: [
      { name: "Tin tức sự kiện", list: list },
      { name: "Thông báo sinh viên", list: list },
    ],
  },
];

export { departments, user };

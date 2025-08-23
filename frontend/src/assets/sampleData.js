import { thumnailDefault } from "../assets";
import {
  picture1,
  picture2,
  picture3,
  picture4,
  picture5,
  picture6,
  iuhPicture1,
  iuhPicture2,
  ctsvPicture1,
  ctsvPicture2,
} from "../assets";

const user = [
  {
    username: "Huy Nguyễn",
    email: "huynguyen@gmail.com",
    password: "123",
    role: "USER",
    avatar: "https://i.pravatar.cc/40",
    number: "0384784472",
    department: "Khoa Công Nghệ Thông Tin",
    studentId: "21128101",
    classRoom: "DHKTPM17B",
  },
  {
    username: "Nga Nguyễn",
    email: "nganguyen@gmail.com",
    password: "123",
    role: "ADMIN",
    avatar: "https://i.pravatar.cc/40",
    number: "0384784472",
    department: "Khoa Công Nghệ Thông Tin",
    studentId: "21128101",
    classRoom: "DHKTPM17C",
  },
];

const list = [
  {
    id: 1,
    title:
      "APSIPA 2025 – Diễn đàn quốc tế về Xử lý tín hiệu và Thông tin diễn ra tại IUH",
    external_url:
      "https://iuh.edu.vn/vi/tin-tuc-su-kien-fi11/apsipa-2025-dien-dan-quoc-te-ve-xu-ly-tin-hieu-va-thong-tin-dien-ra-tai-iuh-a2534.html",
    summary: `Trong bối cảnh công nghệ thông tin và trí tuệ nhân tạo (AI) không ngừng phát
triển, lĩnh vực xử lý tín hiệu và thông tin đang đứng trước những chuyển biến
sâu rộng với nhiều cơ hội và thách thức mới.`,
    content: `_Trong bối cảnh công nghệ thông tin và trí tuệ nhân tạo (AI) không ngừng phát
triển, lĩnh vực xử lý tín hiệu và thông tin đang đứng trước những chuyển biến
sâu rộng với nhiều cơ hội và thách thức mới. Các xu hướng công nghệ như học
sâu (deep learning), xử lý hình ảnh, âm thanh, cùng với hệ thống truyền thông
thông minh đang dần thay đổi cách tiếp cận các vấn đề kỹ thuật truyền thống,
mở đường cho những ứng dụng đột phá trong y tế, công nghiệp và đời sống._

_![](http://localhost:1337/uploads/APSIPA_1_52a0c087d5.jpg)_

_Đại diện Nhà trường có Ban Giám hiệu, lãnh đạo phòng QLKH &HTQT, lãnh đạo
khoa Công nghệ Điện tử đã trao thư cảm ơn đến các diễn giả của hội thảo_

Sáng ngày 26/7/2025, Đại học Công nghiệp TP. Hồ Chí Minh (IUH), thông qua
Phòng Quản lý khoa học và Hợp tác quốc tế, đã đăng cai tổ chức Hội thảo quốc
tế về Xử lý tín hiệu và Thông tin tại Việt Nam năm 2025, trong khuôn khổ chuỗi
sự kiện thường niên của Hội nghị quốc tế APSIPA-ASC.

Tham dự hội thảo có sự hiện diện của GS. Woon-Seng Gan – Chủ tịch APSIPA,
PGS.TS. Nguyễn Cảnh Minh – Phó Chủ tịch kiêm Tổng Thư ký Hội Vô tuyến - Điện
tử Việt Nam, PGS.TS. Huỳnh Trung Hiếu – Phó Hiệu trưởng IUH, PGS.TS. Trịnh
Ngọc Nam – Trưởng phòng Quản lý khoa học và Quan hệ quốc tế, lãnh đạo Khoa
Điện tử cùng đông đảo chuyên gia, giảng viên, nhà nghiên cứu và sinh viên
trong lĩnh vực.

Tại phiên toàn thể, các đại biểu được lắng nghe những báo cáo chuyên sâu từ
các nhà khoa học uy tín quốc tế:

\- GS. Woon-Seng Gan (Đại học Công nghệ Nanyang, Singapore): Spatial Audio
Intelligence: From Representation to Understanding and Control of Auditory
Environments” (Tre tuệ âm thanh không gian: Từ biểu diễn đến hiểu biết và kiểm
soát môi trường thính giác)

\- GS. Tatsuya Kawahara (Đại học Kyoto, Nhật Bản): “Making a Robot to
Communicate with Social Signals” (Chế tạo robot giao tiếp bằng tín hiệu xã
hội)

\- GS. Toshihisa Tanaka (Đại học Nông nghiệp và Công nghệ Tokyo, Nhật Bản):
“Decoding and Synthesizing Speech from ECoG Using Transformer-Based Models”
(Giải mã và tổng hợp giọng nói từ ECoG bằng mô hình dựa trên bộ biến đổi)

\- GS. Hồ Phạm Huy Ánh (Trường Đại học Bách khoa, ĐHQG TP. HCM): “Online
Adaptive Neural Observer for Prescribed Performance Hyper-Chaotic Systems”
(Trình quan sát thần kinh thích ứng trực tuyến cho các hệ thống siêu hỗn loạn
hiệu suất được quy định)

\- PGS. Bonnie Law (Đại học Bách khoa Hồng Kông): “Source Camera
Identification in Image Forensics” (Xác định nguồn camera trong pháp y hình
ảnh)

Bên cạnh phiên toàn thể, chương trình còn có hai phiên tiểu ban chuyên đề với
10 báo cáo khoa học được trình bày, tập trung vào các hướng nghiên cứu mới
trong: Xử lý tín hiệu và hình ảnh y sinh: sử dụng trí tuệ nhân tạo trong chẩn
đoán hình ảnh y học, phục hồi ảnh siêu âm, phân tích chuyển động mạch…Trí tuệ
nhân tạo & học sâu: ứng dụng các mô hình học biểu diễn, Transformer, CNN
(Convolutional Neural Network – Mạng nơ-ron tích chập) nhằm trích xuất thông
tin, phân tích dữ liệu y tế và dự đoán các chỉ số sức khỏe. Ngoài ra, nhóm
nghiên cứu về hệ thống cảm biến và thiết bị nhúng cũng giới thiệu những giải
pháp công nghệ hiện đại như hệ thống đo ảnh đơn điểm, camera nén dữ liệu,
thiết bị thông minh tích hợp FPGA (Field-Programmable Gate Array – Mảng cổng
lập trình được trường)… Các phần trình bày không chỉ mang lại giá trị học
thuật mà còn mở ra những cuộc thảo luận sôi nổi. Nhiều đại biểu và chuyên gia
tham dự đã đặt câu hỏi, chia sẻ ý kiến và góp ý trực tiếp với các diễn giả,
tạo nên một không khí trao đổi học thuật cởi mở và sâu sắc. Những cuộc trao
đổi này không chỉ giúp làm rõ thêm các khía cạnh chuyên môn mà còn khẳng định
tính ứng dụng và tính thời sự của các nghiên cứu trong bối cảnh hiện nay, đặc
biệt là trong việc giải quyết các bài toán thực tiễn trong xử lý tín hiệu và
thông tin.

Hội nghị quốc tế APSIPA được thành lập từ năm 2009 với sứ mệnh thúc đẩy nghiên
cứu, đào tạo và chia sẻ tri thức trong các lĩnh vực xử lý tín hiệu, thông tin
và truyền thông. Sự kiện thường niên APSIPA-ASC đã từng diễn ra tại các thành
phố lớn như Sapporo, Singapore, Los Angeles, Hong Kong, Chiang Mai, Đài Bắc,
Ma Cao… và năm nay, lần đầu tiên được tổ chức tại IUH, tiếp nối thành công của
APSIPA 2024 tại Đại học Công nghiệp Hà Nội.

Trong phát biểu tại hội thảo, PGS.TS. Nguyễn Cảnh Minh, Phó Chủ tịch kiêm Tổng
Thư ký Hội Vô tuyến - Điện tử Việt Nam, bày tỏ ấn tượng với tầm nhìn và khẩu
hiệu của Nhà trường: _“Đổi mới tư duy, làm giàu thêm tri thức – đời sống”_
cùng phương châm hành động của Khoa Điện tử: _“Đổi mới nâng tầm cao mới – Năng
động hội nhập toàn cầu”._ Ông cũng nhấn mạnh vai trò gắn kết của IUH trong hệ
sinh thái học thuật quốc gia và quốc tế, đặc biệt là quyết định mạnh mẽ của
Ban Giám hiệu Nhà trường trong việc đăng cai một sự kiện mang tầm khu vực như
APSIPA.

![](http://localhost:1337/uploads/APSIPA_2_0c8cea1177.jpg)

_PGS.TS. Nguyễn Cảnh Minh, Phó Chủ tịch kiêm Tổng Thư ký Hội Vô tuyến - Điện
tử Việt Nam phát biểu tại hội thảo_

_![](http://localhost:1337/uploads/APSIPA_3_4591721318.jpg)_

_GS.TS Woon Seng Gan, Chủ tịch APSIPA phát biểu tại hội thảo_

_![](http://localhost:1337/uploads/APSIPA_4_dff5e6d038.jpg)_

 _PGS.TS. Huỳnh Trung Hiếu – Phó Hiệu trưởng Nhà trường bày tỏ lời cảm ơn đến
các chuyên gia, đại biểu tham dự hội thảo quốc tế_

Việc tổ chức thành công Hội thảo quốc tế về Xử lý tín hiệu và Thông tin APSIPA
2025 một lần nữa khẳng định Đại học Công nghiệp TP. HCM là điểm đến học thuật
uy tín trong khu vực, thể hiện rõ năng lực chuyên môn, khả năng kết nối học
thuật quốc tế và cam kết mạnh mẽ trong việc đồng hành cùng sự phát triển của
cộng đồng nghiên cứu toàn cầu. IUH không chỉ là nơi đào tạo nguồn nhân lực
chất lượng cao, mà còn là trung tâm lan tỏa tri thức, nơi quy tụ những giá trị
học thuật tiên tiến, góp phần thúc đẩy sự phát triển bền vững của khoa học và
công nghệ Việt Nam. Hội thảo lần này là sự kiện thường niên lần thứ 14 của
Hiệp hội APSIPA, và theo kế hoạch, hội nghị tiếp theo sẽ được tổ chức tại
Shangri-la, Singapore vào ngày 22–24/10/2025, tiếp tục hành trình kết nối tri
thức khu vực và quốc tế.
`,
    thumbnail: "http://localhost:1337/uploads/APSIPA_1_52a0c087d5.jpg",
    publishDate: "07/28/2025",
  },
  {
    id: 2,
    title:
      "Kế hoạch tổ chức Giải thưởng sinh viên nghiên cứu khoa học Euréka cấp Trường năm 2025",
    external_url:
      "https://iuh.edu.vn/vi/thong-bao-fi20/ke-hoach-to-chuc-giai-thuong-sinh-vien-nghien-cuu-khoa-hoc-eureka-cap-truong-nam-2025-a2506.html",
    summary:
      "Kế hoạch tổ chức Giải thưởng sinh viên nghiên cứu khoa học Euréka cấp Trường năm 2025",
    content:
      "[ Tải về và Xem ](http://localhost:1337/uploads/kh_38_2025_28719968eb.pdf)",
    thumbnail: thumnailDefault,
    publishDate: "06/17/2025",
  },
  {
    id: 3,
    title: "[KTPM]: Đánh giá khóa luận tốt nghiệp HK2 2024-2025",
    external_url:
      "https://fit.iuh.edu.vn/news.html@detail@102@3417@%5BKTPM%5D-Danh-gia-khoa-luan-tot-nghiep-HK2-2024-2025",
    summary: `Sáng ngày 28/05/2025, sinh viên khoa CNTT của tất cả các chuyên ngành có buổi
đánh giá khóa luận tốt nghiệp (KLTN), từ lúc 8g00.`,
    content: `
Chào các bạn,
Sáng ngày 28/05/2025, sinh viên khoa CNTT của tất cả các chuyên ngành có buổi
đánh giá khóa luận tốt nghiệp (KLTN), từ lúc 8g00. Ở buổi đánh giá này, sinh
viên làm KLTN ở HK2_2024-2025 trình bày kết quả đạt được sau một khoảng thời
gian học tập, nghiên cứu, thực hiện. Có hai hình thức trình bày là poster hoặc
báo cáo hội đồng. Thông tin về báo cáo KLTN có thể tham khảo [ở
đây.](https://fit.iuh.edu.vn/news.html@detail@155@3415@Danh-sach-bao-cao-Khoa-luan-tot-nghiep-\(he-DH\)-HK2-2024-2025)

Riêng ngành Kỹ thuật phần mềm (KTPM) có đợt này có 44 nhóm KLTN (1 nhóm 2 bạn)
thực hiện KLTN. Trong đó 12 nhóm được ra báo cáo hội đồng (các nhóm có kết quả
cao nhất khóa), các nhóm còn lại báo cáo dưới hình thức Poster.

Các poster của sinh viên ngành KTMP được trình bày ở

  * Tầng 1 nhà H (hàng lang tầng 1 nhà H và hàng lang trước phòng B1.1, B1.2, B1.3)

Các nhóm báo cáo hội đồng được diễn ra tại

  * HĐ01 - Phòng B2.05 – bắt đầu lúc 8g
  * HĐ02 - Phòng B2.04 – bắt đầu lúc 8g
  * HĐ03 - Phòng B2.02 – bắt đầu lúc 8g

Đợt này có những nhóm đề tài có tính khả thi rất cao và rất hay liên quan đến
nhiều công nghệ xu hướng hiện nay. Gồm đề tài sau:

  * Hệ thống quản lý các đề tài khóa luận tốt nghiệp hỗ trợ chống đạo văn (B2.05)
  * Hệ thống quản lý bài báo nghiên cứu khoa học tích hợp công cụ tìm kiếm và gợi ý tham khảo thông minh (B2.05)
  * Xây dựng hệ thống chăm sóc sức khỏe thông minh (Healthcare) (B2.02)
  * Xây dựng hệ thống phân tích dữ liệu điểm số để gợi ý ngành học phù hợp (B2.02)
  * TRAVEL TADA– Hệ Thống Đặt Tour Online Tích Hợp Chatbot AI (B2.04)
  * Hệ thống đánh giá học tập Lập trình Hướng đối tượng tích hợp AI (B2.04)

Hầu hết các đề tài khóa luận xuất sắc đều có tham gia Hội nghị khoa học cấp
khoa SSRC lần 1 năm 2025 do khoa CNTT tổ chức - **sẽ diễn ra ngày 30/05/2025**
(https://vipro.dev/paper/ssrc) và đồng thời tham gia Hội nghị khoa học trẻ YSC
lần 7 của IUH.

Thân mời các bạn sinh viên đang là năm 2,3,4 hoặc chuẩn bị làm KLTN và các
thầy cô quan tâm đến tham quan, lắng nghe, chia sẻ và trao đổi.

Một số hình ảnh buổi báo cáo KLTN và Hội thảo khoa học SV

(Sẽ cập nhật)


    `,
    thumbnail: thumnailDefault,
    publishDate: "05/27/2025",
  },
  {
    id: 4,
    title: "TB2. Thông báo thời gian và danh sách pretest đợt tháng 7/2025",
    external_url:
      "https://fit.iuh.edu.vn/news.html@detail@155@3432@TB2.-Thong-bao-thoi-gian-va-danh-sach-pretest-dot-thang-7-2025",
    summary: `Các bạn SV đã đăng ký Pretest đợt tháng 7/2025`,
    content: `
Khoa CNTT thông báo: 
Các bạn SV đã đăng ký Pretest đợt tháng 7/2025 xem

1\. [Danh sách đăng
ký](http://localhost:1337/uploads/Danh_sach_pretest_dot_thang_7_2025_SV_e4a06c8c22.xlsx)

2\. Lưu ý Thời gian:

* Ngành Kỹ thuật phần mềm: **8h sáng thứ bảy 09/8/2025 tại phòng Lab H9**

*** Các ngành khác: 9h sáng thứ tư 30.7.2025 theo hình thức trực tuyến qua
Zoom, cụ thể**

\+ Công nghệ thông tin: 969 4965 8552 / 237311

\+ Khoa học máy tính: 944 514 1410 / 123456

\+ Hệ thống thông tin: 974 7227 6703 / 541226

\+ Khoa học dữ liệu: 662 722 8932 / 123456

3\. Các phản ánh liên quan công tác đào tạo sinh viên liên hệ qua email Khoa
CNTT: **FIT_IUH@iuh.edu.vn**

      `,
    thumbnail: thumnailDefault,
    publishDate: "07/27/2025",
  },
  {
    id: 5,
    title:
      "Kế hoạch tổ chức Giải thưởng sinh viên nghiên cứu khoa học Euréka cấp Trường năm 2025",
    external_url:
      "https://iuh.edu.vn/vi/thong-bao-fi20/ke-hoach-to-chuc-giai-thuong-sinh-vien-nghien-cuu-khoa-hoc-eureka-cap-truong-nam-2025-a2506.html",
    summary:
      "Kế hoạch tổ chức Giải thưởng sinh viên nghiên cứu khoa học Euréka cấp Trường năm 2025",
    content:
      "[ Tải về và Xem ](http://localhost:1337/uploads/kh_38_2025_28719968eb.pdf)",
    thumbnail: thumnailDefault,
    publishDate: "06/17/2025",
  },
  {
    id: 6,
    title:
      "Kế hoạch tổ chức Giải thưởng sinh viên nghiên cứu khoa học Euréka cấp Trường năm 2025",
    external_url:
      "https://iuh.edu.vn/vi/thong-bao-fi20/ke-hoach-to-chuc-giai-thuong-sinh-vien-nghien-cuu-khoa-hoc-eureka-cap-truong-nam-2025-a2506.html",
    summary:
      "Kế hoạch tổ chức Giải thưởng sinh viên nghiên cứu khoa học Euréka cấp Trường năm 2025",
    content:
      "[ Tải về và Xem ](http://localhost:1337/uploads/kh_38_2025_28719968eb.pdf)",
    thumbnail: thumnailDefault,
    publishDate: "06/17/2025",
  },
  {
    id: 7,
    title:
      "Kế hoạch tổ chức Giải thưởng sinh viên nghiên cứu khoa học Euréka cấp Trường năm 2025",
    external_url:
      "https://iuh.edu.vn/vi/thong-bao-fi20/ke-hoach-to-chuc-giai-thuong-sinh-vien-nghien-cuu-khoa-hoc-eureka-cap-truong-nam-2025-a2506.html",
    summary:
      "Kế hoạch tổ chức Giải thưởng sinh viên nghiên cứu khoa học Euréka cấp Trường năm 2025",
    content:
      "[ Tải về và Xem ](http://localhost:1337/uploads/kh_38_2025_28719968eb.pdf)",
    thumbnail: thumnailDefault,
    publishDate: "06/17/2025",
  },
  {
    id: 8,
    title:
      "Kế hoạch tổ chức Giải thưởng sinh viên nghiên cứu khoa học Euréka cấp Trường năm 2025",
    external_url:
      "https://iuh.edu.vn/vi/thong-bao-fi20/ke-hoach-to-chuc-giai-thuong-sinh-vien-nghien-cuu-khoa-hoc-eureka-cap-truong-nam-2025-a2506.html",
    summary:
      "Kế hoạch tổ chức Giải thưởng sinh viên nghiên cứu khoa học Euréka cấp Trường năm 2025",
    content:
      "[ Tải về và Xem ](http://localhost:1337/uploads/kh_38_2025_28719968eb.pdf)",
    thumbnail: thumnailDefault,
    publishDate: "06/17/2025",
  },
];

const departments = [
  {
    id: 1,
    name: "Trang tổng hợp tin tức",
    categories: [
      { id: 1, name: "Tin tức sự kiện", list: list },
      { id: 2, name: "Thông báo sinh viên", list: list },
      { id: 3, name: "Thông tin tuyển dụng", list: list },
      { id: 4, name: "Thông tin tuyển sinh", list: list },
    ],
  },
  {
    id: 2,
    name: "Trang thông tin chính thức",
    info: {
      number: "0283 8940 390",
      location: "12 Nguyễn Văn Bảo, Phường 4, Quận Gò Vấp",
      website: "iuh.edu.vn",
      email: "dhcn@iuh.edu.vn",
    },
    bannerSliderList: [iuhPicture1, iuhPicture2],
    categories: [
      { id: 1, name: "Tin tức sự kiện", list: list },
      { id: 2, name: "Thông báo sinh viên", list: list },
      { id: 3, name: "Thông tin tuyển dụng", list: list },
      { id: 4, name: "Thông tin tuyển sinh", list: list },
    ],
  },
  {
    id: 3,
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
      { id: 1, name: "Tin tức sự kiện", list: list },
      { id: 2, name: "Thông báo sinh viên", list: list },
    ],
  },
  {
    id: 4,
    name: "Phòng đào tạo",
    info: {
      number: "0283 9851 932",
      location:
        "Tầng trệt nhà B - 12 Nguyễn Văn Bảo, phường Hạnh Thông, Thành phố Hồ Chí Minh",
      website: "pdt.iuh.edu.vn",
      email: "phongdaotao@iuh.edu.vn",
    },
    bannerSliderList: [picture4, picture6],
    categories: [
      { id: 1, name: "Tin tức sự kiện", list: list },
      { id: 2, name: "Thông báo sinh viên", list: list },
    ],
  },
  {
    id: 5,
    name: "Phòng công tác sinh viên",
    info: {
      number: "0283 8940 390",
      location:
        "Tầng trệt nhà D - 12 Nguyễn Văn Bảo, Phường 1, Quận Gò Vấp, Tp. HCM",
      website: "ctsv.iuh.edu.vn",
      email: "đang cập nhật...",
    },
    bannerSliderList: [ctsvPicture1, ctsvPicture2],
    categories: [
      { id: 1, name: "Tin tức sự kiện", list: list },
      { id: 2, name: "Thông báo sinh viên", list: list },
      { id: 3, name: "Hoạt động phong trào", list: list },
    ],
  },
];

const mockDepartments = [
  {
    id: 1,
    name: "Trang thông tin chính thức",
    code: "iuh",
    number: "0283 8940 390",
    leader: "",
    email: "",
    website: "iuh.edu.vn",
    location: "",
    categories: [
      { id: 1, name: "Tin tức sự kiện", list: list },
      { id: 2, name: "Thông báo sinh viên", list: list },
      { id: 3, name: "Thông tin tuyển dụng", list: list },
      { id: 4, name: "Thông tin tuyển sinh", list: list },
    ],
  },
  {
    id: 2,
    name: "Khoa Công nghệ thông tin",
    code: "fit",
    number: "0283 8940 390",
    leader: "Nguyễn Thị Nga",
    email: "fit@iuh.edu.vn",
    website: "fit.iuh.edu.vn",
    location: "Nhà E, 12 Nguyễn Văn Bảo, Gò Vấp, Tp. HCM",
    categories: [
      { id: 1, name: "Tin tức sự kiện", list: list },
      { id: 2, name: "Thông báo sinh viên", list: list },
    ],
  },
  {
    id: 3,
    name: "Phòng công tác sinh viên",
    code: "ctsv",
    number: "0283 8940 390",
    leader: "Nguyễn Thị Nga",
    email: "ctsv@iuh.edu.vn",
    website: "ctsv.iuh.edu.vn",
    location: "Nhà D, 12 Nguyễn Văn Bảo, Gò Vấp, Tp. HCM",
    categories: [
      { id: 1, name: "Tin tức sự kiện", list: list },
      { id: 2, name: "Thông báo sinh viên", list: list },
    ],
  },
];

export { departments, user, list, mockDepartments };

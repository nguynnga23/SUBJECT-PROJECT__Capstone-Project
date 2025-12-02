import React, { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";

// ================== MOCK DATA ==================
const articles = [
  {
    documentId: "oc8ktmmln44560fn1pbgrlmr",
    title:
      "KHÓA HỌC AOTS 2025 – HỢP TÁC GIỮA KHOA CÔNG NGHỆ THÔNG TIN VÀ CÁC DOANH NGHIỆP NHẬT BẢN",
    externalPublishDate: "2025-11-03",
    content:
      "Từ ngày 21/7 đến 03/10/2025, Khoa Công nghệ Thông tin phối hợp cùng các doanh nghiệp Nhật Bản gồm Keizu, Sorimachi, IMlink và Ryomo, với sự hỗ trợ của Tổ chức AOTS (The Association for Overseas Technical Cooperation and Sustainable Partnerships), đã tổ chức thành công Khóa học AOTS 2025.\n\nKhóa học gồm 31 buổi học kết hợp Online và Offline, giảng dạy bằng tiếng Việt, nhằm nâng cao năng lực kỹ thuật, kỹ năng nghề nghiệp và hiểu biết văn hóa doanh nghiệp Nhật Bản cho sinh viên ngành Công nghệ Thông tin.\n\nCác chuyên gia đến từ doanh nghiệp Nhật trực tiếp giảng dạy nhiều chủ đề thực tiễn:\n\n  * Keizu: Ứng dụng _No-code_ và _Low-code_ trong phát triển phần mềm (8 buổi)\n\n  * Sorimachi: Tiếng Nhật chuyên ngành CNTT & văn hóa doanh nghiệp Nhật Bản (10 buổi)\n\n  * IMLink: Lập trình ứng dụng Web với _React_ (6 buổi)\n\n  * Ryomo: Ứng dụng _Laravel_ và _MySQL_ trong xác thực người dùng và bảo mật web (7 buổi)\n\n\n\n\nKết thúc khóa học, các sinh viên hoàn thành đầy đủ bài tập và tham gia đúng quy định được nhận Giấy chứng nhận hoàn thành khóa học.\n\nLễ bế giảng và trao chứng nhận, đồng thời trao học bổng cho các sinh viên xuất sắc, đã diễn ra trang trọng, đánh dấu thành công tốt đẹp của chương trình.\n\nKhóa học AOTS 2025 không chỉ giúp sinh viên trang bị kỹ năng chuyên môn và tác phong làm việc chuyên nghiệp, mà còn góp phần thúc đẩy mối quan hệ hợp tác giữa Khoa Công nghệ Thông tin và Hội các doanh nghiệp Nhật Bản tại Việt Nam, mở ra nhiều cơ hội giao lưu, đào tạo và hợp tác trong tương lai.![](http://localhost:1337/uploads/IMG_0239_5fb4ac264a.jpg)  \n![](http://localhost:1337/uploads/IMG_0554_2e2a04e555.jpg)![](http://localhost:1337/uploads/IMG_0564_7541b01156.jpg)![](http://localhost:1337/uploads/IMG_0583_a309b53d01.jpg)![](http://localhost:1337/uploads/IMG_0595_04da74d42c.jpg)![](http://localhost:1337/uploads/IMG_0604_aa866ad729.jpg)![](http://localhost:1337/uploads/IMG_0629_f1d4f46410.jpg)![](http://localhost:1337/uploads/c817cbcf82960ec85787_44b36181be.jpg)![](http://localhost:1337/uploads/f20e38286e71e22fbb60_c92150bb1d.jpg)\n",
    externalUrl:
      "https://fit.iuh.edu.vn/news.html@detail@102@3480@KHOA-HOC-AOTS-2025-%E2%80%93-HOP-TAC-GIUA-KHOA-CONG-NGHE-THONG-TIN-VA-CAC-DOANH-NGHIEP-NHAT-BAN",
    summary:
      "Khoa CNTT sẽ tổ chức khóa học AOTS 2025 từ 21/7 đến 03/10/2025, hợp tác với doanh nghiệp Nhật Bản và AOTS, bao gồm 31 buổi học online/offline bằng tiếng Việt. Khóa học trang bị kỹ năng No-code/Low-code, tiếng Nhật chuyên ngành, React, Laravel, MySQL, và văn hóa doanh nghiệp Nhật Bản cho sinh viên CNTT. Sau khi hoàn thành, sinh viên nhận chứng nhận và có cơ hội nhận học bổng. Mục tiêu của khóa học là nâng cao năng lực chuyên môn và tăng cường hợp tác giữa Khoa và doanh nghiệp Nhật Bản.\n",
    thumbnail: "https://iuh.edu.vn/templates/2015/image/img_default.png",
    externalSlug:
      "news.html@detail@102@3480@KHOA-HOC-AOTS-2025-%E2%80%93-HOP-TAC-GIUA-KHOA-CONG-NGHE-THONG-TIN-VA-CAC-DOANH-NGHIEP-NHAT-BAN",
    createdAt: "2025-11-22T11:20:59.878Z",
    updatedAt: "2025-11-29T07:59:36.262Z",
    publishedAt: "2025-11-29T07:59:36.169Z",
    category: {
      documentId: "g9hst4keus0faeiy7rwedk2k",
      categoryName: "TIN TỨC - SỰ KIỆN",
      categoryUrl: "https://fit.iuh.edu.vn/news.html@102@Tin-tuc-su-kien",
      keyCategory: null,
      lastExternalPublishDate: "2025-11-03",
      departmentSource: {
        documentId: "tgup7ekabcccxfl881k160ef",
        url: "https://fit.iuh.edu.vn",
        label: "Khoa Công Nghệ Thông Tin",
        keyDepartmentSource: null,
        createdAt: "2025-09-15T14:12:07.651Z",
        updatedAt: "2025-11-08T11:45:33.833Z",
        publishedAt: "2025-11-08T11:45:34.759Z",
        crawlerConfig: null,
        department: null,
        categories: [],
      },
    },
  },
  {
    documentId: "ugx6azlsqhcelonswukdxxyk",
    title: "Seminar môn học: Lập trình Hướng đối tượng (OOP)",
    externalPublishDate: "2025-10-21",
    content:
      "Ngày 16 tháng 10 năm 2025, bộ môn Kỹ Thuật Phần Mềm đã tổ chức seminar môn học: “Lập Trình Hướng đối tượng”. Mục đích nhầm rà soát, kiểm tra, thảo luận, đánh giá lại đề cương, bài tập và chuẩn đầu ra của môn học để cập nhật định hướng giảng dạy phù hợp với xu thế ngành cho những năm học tiếp theo.\n\nTham gia buổi seminar gồm: cô Nguyễn Thị Hạnh chủ trì buổi seminar, thầy Đặng Văn Thuận và cô Nguyễn Thị Hoàng Khánh trình bày báo cáo seminar, toàn bộ giảng viên bộ môn Kỹ Thuật Phần Mềm và một số giảng viên thuộc bộ môn khác trong khoa Công Nghệ Thông Tin cùng lắng nghe, thảo luận và góp ý.\n\n![](http://localhost:1337/uploads/z7126247129735_2b43cb8f3afcbfe211f71c8434cdd5ae_9ffb1b3625.jpg)\n\n![](http://localhost:1337/uploads/z7126247137630_01ef57fbdfa148754a95c7aff451cbe4_f70ca34b0d.jpg)\n\nThầy Đặng Văn Thuận trình bày về đề cương môn học, chuẩn đầu ra của môn học, cách thức tổ chức giảng dạy, và cách thức đánh giá kết quả học tập của sinh viên. Cô Khánh trình đưa ra những chỗ còn bất cập trong bộ bài tập hiện đang sử dụng và đưa ra một số gợi ý thay đổi, bổ sung, chỉnh sửa sao cho phù hợp với xu hướng đạo tạo giảng dạy hiện nay và trong tương lai. Các giảng viên tham gia buổi seminar đã thảo luận, đánh giá, đưa ra những ý kiến đóng góp kiến tích cực.\n\nSau buổi seminar, bô môn đã thống nhất và đưa ra những quyết định như sau:\n\n  * Đề cương và bộ bài tập môn học được cập nhật phù hợp với xu hướng phát triển của ngành.\n  * Cách thức tổ chức giảng dạy, và cách thức đánh giá kết quả học tập của sinh viên.\n  * Các giảng viên tham gia giảng dạy môn học.\n  * Ghi nhận những đóng góp tích cực từ toàn thể quý thầy cô tham dự\n\n\n\n_**(Tin từ BM KTPM)**_\n",
    externalUrl:
      "https://fit.iuh.edu.vn/news.html@detail@102@3475@Seminar-mon-hoc-Lap-trinh-Huong-doi-tuong-(OOP)",
    summary:
      'Ngày 16/10/2025, bộ môn Kỹ Thuật Phần Mềm tổ chức seminar về môn "Lập Trình Hướng đối tượng" nhằm rà soát, đánh giá và cập nhật đề cương, bài tập, chuẩn đầu ra cho phù hợp với xu hướng ngành. Cô Nguyễn Thị Hạnh chủ trì, thầy Đặng Văn Thuận trình bày về đề cương, chuẩn đầu ra, cách thức tổ chức và đánh giá, còn cô Nguyễn Thị Hoàng Khánh đề xuất chỉnh sửa bộ bài tập. Các giảng viên đã thảo luận và đóng góp ý kiến, dẫn đến quyết định cập nhật đề cương, bộ bài tập, phương pháp giảng dạy và đánh giá, đồng thời ghi nhận đóng góp từ các thầy cô tham dự.\n',
    thumbnail:
      "http://localhost:1337/uploads/z7126247137630_01ef57fbdfa148754a95c7aff451cbe4_f70ca34b0d.jpg",
    externalSlug:
      "news.html@detail@102@3475@Seminar-mon-hoc-Lap-trinh-Huong-doi-tuong-(OOP)",
    createdAt: "2025-11-22T11:21:42.06Z",
    updatedAt: "2025-11-22T11:21:42.06Z",
    publishedAt: "2025-11-22T11:21:41.84Z",
    category: {
      documentId: "g9hst4keus0faeiy7rwedk2k",
      categoryName: "TIN TỨC - SỰ KIỆN",
      categoryUrl: "https://fit.iuh.edu.vn/news.html@102@Tin-tuc-su-kien",
      keyCategory: null,
      lastExternalPublishDate: "2025-11-03",
      departmentSource: {
        documentId: "tgup7ekabcccxfl881k160ef",
        url: "https://fit.iuh.edu.vn",
        label: "Khoa Công Nghệ Thông Tin",
        keyDepartmentSource: null,
        createdAt: "2025-09-15T14:12:07.651Z",
        updatedAt: "2025-11-08T11:45:33.833Z",
        publishedAt: "2025-11-08T11:45:34.759Z",
        crawlerConfig: null,
        department: null,
        categories: [],
      },
    },
  },
  {
    documentId: "e6sgxekaox02kks4xk4ds7j4",
    title: "[RECAP]: MỞ CỬA CƠ HỘI – GHI DẤU BƯỚC ĐẦU TRONG HÀNH TRÌNH TECH",
    externalPublishDate: "2025-10-21",
    content:
      "Vào tối ngày 16/10/2025 vừa qua, Bô môn **Kỹ thuật phần mềm** và câu lạc bộ **IUH DSC** đã tổ chức thành công buổi workshop “**KICKSTART YOUR TECH JOURNEY WITH GITHUB STUDENT DEVELOPER PACK** ”.\n\nMục tiêu của workshop là giúp các bạn sinh viên **hiểu rõ hơn về Github và cách sử dụng email sinh viên của mình** để tận dụng các công cụ, dịch vụ có hỗ trợ sinh viên để từ đó, phát triển kỹ năng lập trình cũng như hoàn thiện các dự án cá nhân.\n\nChương trình bắt đầu bằng phần trả lời các câu hỏi mà các bạn gửi về khi đăng ký tham gia workshop. Sau đó, câu lạc bộ đã giới thiệu tổng quan về Github - nền tảng lưu trữ và quản lý mã nguồn lớn nhất thế giới.\n\nCác nội dung chính gồm:\n\n  * GitHub là gì và vì sao nó quan trọng với lập trình viên.\n\n  * Các tính năng chính như **Pull Request** , **Code Review** , **GitHub Actions** , **GitHub Pages** ,...\n\n  * Lợi ích của việc sử dụng GitHub trong học tập và làm việc nhóm.\n\n\n\n\nTiếp theo, câu lạc bộ đã giới thiệu về **GitHub Student Developer Pack** , gồm có các nội dung như:\n\n  * GSDP là gì, dành cho đối tượng nào và mang lại giá trị gì.\n\n  * Liệt kê các dịch vụ hỗ trợ nổi bật mà sinh viên được sử dụng miễn phí hoặc giảm giá.\n\n  * Hướng dẫn chi tiết cách đăng ký GSDP bằng email sinh viên.\n\n\n\n\nSau đó, câu lạc bộ cũng giới thiệu và hướng dẫn cách áp dụng GSDP cho từng dịch vụ cụ thể, chia theo từng giai đoạn học tập:\n\n  * **Năm 1:** Notion, GitHub Pro, GitLens, GitHub Pages, Codespaces, JetBrains, Figma,...\n\n  * **Năm 2:** FrontendMasters, Bootstrap Studio, CodeX,...\n\n  * **Năm 3:** Heroku, Vercel, Appwrite, Namecheap, Name.com,...\n\n  * **Năm 4:** BrowserStack, Digital Ocean, Microsoft Azure, LocalStack, AlgoExpert,...\n\n\n\nNgay sau đó là phần **quay số minigame.** Đã có tổng cộng 11 bạn đủ điều kiện để tham gia trò chơi và đã chọn được 3 bạn may mắn để nhận được các phần quà hấp dẫn từ câu lạc bộ!\n\nCuối cùng, câu lạc bộ IUH DSC chúng mình xin gửi lời cảm ơn chân thành đến **Khoa Công nghệ Thông tin.** Đồng thời, câu lạc bộ cũng xin gửi lời **cảm ơn Thầy/Cô và các bạn sinh viên** đã dành thời gian tham dự, đóng góp ý kiến, và cùng nhau tạo nên một buổi workshop đầy ý nghĩa. Sự tham gia đông đảo của mọi người chính là nguồn động lực to lớn để câu lạc bộ có thể tổ chức tiếp các workshop trong tương lai!\n\nHẹn gặp Thầy/Cô và các bạn ở những buổi workshop tiếp theo!\n\nMột số hình ảnh tiêu biểu trong buổi workshop:\n\n![](http://localhost:1337/uploads/z7141447419811_694d7fc0a3aa4b3c2ad001225d1e3758_05f57f81a4.jpg)\n\n![](http://localhost:1337/uploads/5_0a6d6b6796.jpg)\n\n![](http://localhost:1337/uploads/Capture_ec97a2ad7a.PNG)\n\n_**(Tin từ câu lạc bộ IUH DSC)**_\n",
    externalUrl:
      "https://fit.iuh.edu.vn/news.html@detail@102@3474@%5BRECAP%5D-MO-CUA-CO-HOI-%E2%80%93-GHI-DAU-BUOC-DAU-TRONG-HANH-TRINH-TECH",
    summary:
      "Vào ngày 16/10/2025, bộ môn Kỹ thuật phần mềm và IUH DSC đã tổ chức workshop về GitHub Student Developer Pack (GSDP) nhằm giúp sinh viên phát triển kỹ năng lập trình. Workshop giới thiệu tổng quan về GitHub, các tính năng chính và lợi ích của nó, đồng thời hướng dẫn chi tiết cách đăng ký và sử dụng GSDP với nhiều dịch vụ hỗ trợ cho từng năm học. Các dịch vụ được giới thiệu bao gồm Notion, JetBrains, Heroku, Digital Ocean và nhiều công cụ khác. Sự kiện còn có minigame với các phần quà hấp dẫn và kết thúc bằng lời cảm ơn từ câu lạc bộ IUH DSC đến khoa Công nghệ Thông tin, giảng viên và sinh viên tham dự.\n",
    thumbnail: "http://localhost:1337/uploads/5_0a6d6b6796.jpg",
    externalSlug:
      "news.html@detail@102@3474@%5BRECAP%5D-MO-CUA-CO-HOI-%E2%80%93-GHI-DAU-BUOC-DAU-TRONG-HANH-TRINH-TECH",
    createdAt: "2025-11-22T11:21:24.404Z",
    updatedAt: "2025-11-22T11:21:24.404Z",
    publishedAt: "2025-11-22T11:21:24.186Z",
    category: {
      documentId: "g9hst4keus0faeiy7rwedk2k",
      categoryName: "TIN TỨC - SỰ KIỆN",
      categoryUrl: "https://fit.iuh.edu.vn/news.html@102@Tin-tuc-su-kien",
      keyCategory: null,
      lastExternalPublishDate: "2025-11-03",
      departmentSource: {
        documentId: "tgup7ekabcccxfl881k160ef",
        url: "https://fit.iuh.edu.vn",
        label: "Khoa Công Nghệ Thông Tin",
        keyDepartmentSource: null,
        createdAt: "2025-09-15T14:12:07.651Z",
        updatedAt: "2025-11-08T11:45:33.833Z",
        publishedAt: "2025-11-08T11:45:34.759Z",
        crawlerConfig: null,
        department: null,
        categories: [],
      },
    },
  },
];

// ================== COLORS ==================
const lineColors = {
  "Thông báo": "#ff4d4f",
  "Sự kiện": "#00b96b",
  "Tin tức": "#1677ff",
};

// ================== COMPONENT ==================
export default function Dashboard() {
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  // ========= Group theo Department Source =========
  const groupedByDepartment = useMemo(() => {
    const group = {};
    articles.forEach((a) => {
      const dep = a.category.departmentSource.label;
      const cat = a.category.categoryName;

      if (!group[dep]) group[dep] = { count: 0, categories: {}, articles: [] };
      group[dep].count += 1;
      group[dep].articles.push(a);

      if (!group[dep].categories[cat]) group[dep].categories[cat] = 0;
      group[dep].categories[cat] += 1;
    });
    return group;
  }, [articles]);

  // ========= LineChart Data =========
  const lineChartData = useMemo(() => {
    if (!selectedDepartment) return [];
    const data = {};
    groupedByDepartment[selectedDepartment].articles.forEach((a) => {
      const day = new Date(a.publishedAt).toLocaleDateString("vi-VN", {
        weekday: "short",
      });
      const cat = a.category.categoryName;
      if (!data[day]) data[day] = { day };
      if (!data[day][cat]) data[day][cat] = 0;
      data[day][cat] += 1;
    });
    // Chuyển sang array và sắp xếp thứ tự Thứ 2 -> CN
    const daysOrder = [
      "Thứ 2",
      "Thứ 3",
      "Thứ 4",
      "Thứ 5",
      "Thứ 6",
      "Thứ 7",
      "CN",
    ];
    return daysOrder.map((d) => data[d] || { day: d });
  }, [selectedDepartment, groupedByDepartment]);

  // ========= Summary =========
  const summary = useMemo(() => {
    const totalArticles = articles.length;
    const totalDepartments = Object.keys(groupedByDepartment).length;
    const totalCategories = new Set(
      articles.map((a) => a.category.categoryName)
    ).size;
    return { totalArticles, totalDepartments, totalCategories };
  }, [articles, groupedByDepartment]);

  return (
    <div className="p-6 space-y-6">
      {/* ============ SUMMARY ============ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-sm text-gray-500">Tổng bài viết</h3>
          <p className="text-xl font-bold">{summary.totalArticles}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-sm text-gray-500">Tổng Department</h3>
          <p className="text-xl font-bold">{summary.totalDepartments}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-sm text-gray-500">Tổng Category</h3>
          <p className="text-xl font-bold">{summary.totalCategories}</p>
        </div>
      </div>

      {/* ============ BARCHART: Department ========= */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">
          Số lượng bài viết theo Department
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={Object.entries(groupedByDepartment).map(([dep, val]) => ({
              dep,
              count: val.count,
            }))}
            onClick={(data) => {
              if (data && data.activeLabel)
                setSelectedDepartment(data.activeLabel);
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="dep" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" name="Số bài viết" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ============ BARCHART: Category ========= */}
      {selectedDepartment && (
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">
            Số lượng bài viết theo Category ({selectedDepartment})
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={Object.entries(
                groupedByDepartment[selectedDepartment].categories
              ).map(([cat, count]) => ({ cat, count }))}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="cat" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#82ca9d" name="Số bài viết" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* ============ LINECHART: Frequency ========= */}
      {selectedDepartment && (
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">
            Tần suất đăng bài theo ngày ({selectedDepartment})
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              {Object.keys(lineChartData[0])
                .filter((k) => k !== "day")
                .map((key) => (
                  <Line
                    key={key}
                    type="monotone"
                    dataKey={key}
                    stroke={lineColors[key] || "#000"}
                    strokeWidth={3}
                    dot
                  />
                ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* ============ LIST: Latest Articles ========= */}
      {selectedDepartment && (
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">
            Bài viết mới ({selectedDepartment})
          </h3>
          <ul className="space-y-2">
            {groupedByDepartment[selectedDepartment].articles
              .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
              .map((a) => (
                <li key={a.documentId} className="border-b pb-1">
                  <p className="font-medium">{a.title}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(a.publishedAt).toLocaleString("vi-VN")} -{" "}
                    {a.category.categoryName}
                  </p>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}

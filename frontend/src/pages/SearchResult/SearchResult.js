import { IoList } from "react-icons/io5";

export default function SearchResult() {
  const summary =
    "ReactJS là một thư viện JavaScript để xây dựng giao diện người dùng. Nó giúp tạo các component tái sử dụng và quản lý trạng thái hiệu quả.";

  const results = [
    {
      title: "ReactJS Official Website",
      url: "https://reactjs.org/",
      description:
        "Trang web chính thức của ReactJS với tài liệu hướng dẫn chi tiết.",
      thumbnail: "https://reactjs.org/logo-og.png",
      source: "reactjs.org",
    },
    {
      title: "ReactJS Tutorial for Beginners",
      url: "https://www.example.com/react-tutorial",
      description:
        "Hướng dẫn ReactJS cơ bản từ việc tạo component đến quản lý state và props.",
      thumbnail: null,
      source: "example.com",
    },
  ];
  return (
    <div className="max-w-4xl mx-auto p-4">
      {summary && (
        <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
          <h2 className="text-lg font-semibold mb-2">Thông tin tổng hợp:</h2>
          <p className="text-gray-700">{summary}</p>
        </div>
      )}

      <h2 className="flex items-center text-base font-semibold text-gray-800 mt-4 p-2 pl-0">
        <IoList size={20} className="mr-2" />
        CÁC BÀI VIẾT LIÊN QUAN
      </h2>

      <div className="space-y-4">
        {results && results.length > 0 ? (
          results.map((item, index) => (
            <a
              key={index}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 border border-gray-200 rounded hover:shadow-md transition-shadow"
            >
              <div className="flex gap-4">
                {item.thumbnail && (
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded"
                  />
                )}
                <div className="flex-1">
                  <h3 className="text-blue-600 text-lg font-medium hover:underline">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-gray-700 mt-1 line-clamp-3">
                      {item.description}
                    </p>
                  )}
                  {item.source && (
                    <p className="text-sm text-gray-500 mt-1">{item.source}</p>
                  )}
                </div>
              </div>
            </a>
          ))
        ) : (
          <p className="text-gray-500">Không tìm thấy kết quả nào.</p>
        )}
      </div>
    </div>
  );
}

import { useSelector } from "react-redux";

function NotifyForm({ setUserProfile }) {
  const list = useSelector((state) => state.article.allArticles);
  return (
    <div className="relative w-[360px] max-w-3xl mx-auto bg-white rounded p-2 shadow">
      <h2 className="text-lg font-semibold mb-3">Thông báo</h2>
      <div className="space-y-3 max-h-[250px] overflow-auto">
        {list && list.length > 0 ? (
          list.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-1 p-1 border rounded-lg hover:bg-gray-50 transition"
            >
              {/* Avatar */}
              <div className="w-[50px]">
                <img
                  src={item.thumbnail}
                  alt="avatar"
                  className="h-[30px] mb-1"
                />

                <span className="text-[8px] text-gray-500 flex items-center gap-1">
                  {item.publishDate}
                </span>
              </div>

              {/* Nội dung thông báo */}
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="text-[10px] font-medium line-clamp-2">
                    {item.title}
                  </h3>
                </div>
                <p className="text-[8px] text-gray-600 mt-1">
                  {"Khoa Công Nghệ Thông Tin"} · {"Tin Tức Sự Kiện"}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500 text-center">
            Không có thông báo nào
          </p>
        )}
      </div>
    </div>
  );
}

export default NotifyForm;

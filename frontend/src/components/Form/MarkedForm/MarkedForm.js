function MarkedForm({ setUserProfile }) {
  return (
    <div className="relative max-w-3xl mx-auto bg-white rounded">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Bài viết đã đánh dấu
      </h2>
      <button
        className="absolute top-[-20px] right-0 text-gray-500 hover:text-black text-xl"
        onClick={() => setUserProfile(null)}
      >
        &times;
      </button>
      {/* {markedArticles.length === 0 ? (
        <p className="text-gray-500">Bạn chưa đánh dấu bài viết nào.</p>
      ) : (
        <ul className="space-y-3">
          {markedArticles.map((article) => (
            <li
              key={article.id}
              className="border rounded-md p-4 hover:bg-gray-50 flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold text-lg">{article.title}</h3>
                <p className="text-sm text-gray-500">Ngày: {article.date}</p>
              </div>
              <button className="text-red-500 hover:underline">
                Bỏ đánh dấu
              </button>
            </li>
          ))}
        </ul>
      )} */}
    </div>
  );
}

export default MarkedForm;

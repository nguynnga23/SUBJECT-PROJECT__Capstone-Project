function ArticleSummary({ summary }) {
  return (
    <div>
      <b className="text-[15px]">Tóm tắt:</b>
      <i className="mt-2 rounded ml-1 text-justify text-[14px]">{summary}</i>
      <div>
        <i className="text-red-500 flex justify-end p-2">
          ! Thông tin từ AI có thể sẽ không chính xác hoàn toàn.
        </i>
      </div>
    </div>
  );
}

export default ArticleSummary;

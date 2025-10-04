import { useSelector } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useState, useEffect } from "react";
import { RiDraggable } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { LiaTimesCircle } from "react-icons/lia";

function MarkedForm({ setUserProfile }) {
  const navigate = useNavigate();
  const markedListId = useSelector((state) => state.article.listMarked);
  const articles = useSelector((state) => state.article.allArticles);

  const markedListArticle = articles.filter((item) =>
    markedListId.includes(item.id)
  );

  const [list, setList] = useState(markedListArticle);

  // Đồng bộ với Redux mỗi khi danh sách thay đổi
  useEffect(() => {
    setList(markedListArticle);
  }, []);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const reordered = Array.from(list);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);

    setList(reordered);
  };

  const handleClickArticle = (articleId) => {
    navigate(`/article/${articleId}`);
    setUserProfile(false);
  };

  return (
    <div className="relative w-[600px] max-w-3xl mx-auto bg-white rounded p-6 shadow">
      <LiaTimesCircle
        className="absolute top-4 right-4 text-gray-500 w-[25px] h-[25px] rounded-full hover:bg-red-500 hover:text-white cursor-pointer"
        onClick={() => setUserProfile(false)}
      />
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Bài viết đã đánh dấu
      </h2>
      {list.length === 0 ? (
        <p className="text-gray-500">Bạn chưa đánh dấu bài viết nào.</p>
      ) : (
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="marked-articles">
            {(provided) => (
              <ul
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-3 max-h-[400px] overflow-auto border-b pb-4"
              >
                {list.map((article, index) => (
                  <Draggable
                    key={article.id}
                    draggableId={article.id.toString()}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`border rounded-md p-2 flex justify-between items-center transition ${
                          snapshot.isDragging
                            ? "bg-blue-50 shadow-lg"
                            : "hover:bg-gray-50"
                        }`}
                        onClick={() => handleClickArticle(article.id)}
                      >
                        <div className="flex items-center">
                          <span className="cursor-grab pr-2">
                            <RiDraggable size={20} />
                          </span>
                          <div>
                            <h3 className="text-[12px] font-medium truncate max-w-[430px]">
                              {article.title}
                            </h3>
                            <i className="text-[10px] text-gray-500">
                              {article.publishDate}
                            </i>
                          </div>
                        </div>
                        <button className="text-red-500 text-[12px] hover:underline">
                          Bỏ đánh dấu
                        </button>
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  );
}

export default MarkedForm;

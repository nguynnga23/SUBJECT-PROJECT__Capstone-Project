import { useSelector } from "react-redux";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LiaTimesCircle } from "react-icons/lia";
import { useApi } from "../../../hooks/useApi";
import {
  deleteBookMark,
  deleteBookMarkById,
  getBookMarkByUserId,
} from "../../../apis/marked";
import { MdOutlineDelete } from "react-icons/md";

import ArticleItem from "../../ArtileItem";
import Spinner from "../../Spinner";
import { toast } from "react-toastify";

function MarkedForm({ setUserProfile }) {
  const navigate = useNavigate();
  const [markedList, setMarkedList] = useState([]);
  const currentUser = useSelector((state) => state.auth.user);

  const { request: fetchGetListBookMark, loading: loadingGetListBookMark } =
    useApi(getBookMarkByUserId);

  useEffect(() => {
    if (!currentUser) return;

    const fetchMarked = async () => {
      try {
        const res = await fetchGetListBookMark({
          userId: currentUser?.documentId,
        });
        if (res) {
          setMarkedList(res);
        }
      } catch (error) {
        toast.error("Không thể tải dữ liệu");
      }
    };

    fetchMarked();
  }, [currentUser]);

  const handleClickArticle = (articleId) => {
    navigate(`/article/${articleId}`);
    setUserProfile(false);
  };

  const handleDeleteMarked = async (markedId) => {
    try {
      const res = await deleteBookMarkById({
        bookmarkId: markedId,
      });
    } catch (error) {
      toast.error("Không thể xóa đánh dấu bài viết này, thử lại sau");
    }
  };

  return (
    <div className="relative w-[800px] max-w-3xl mx-auto bg-white rounded p-6 shadow">
      <LiaTimesCircle
        className="absolute top-4 right-4 text-gray-500 w-[25px] h-[25px] rounded-full hover:bg-red-500 hover:text-white cursor-pointer"
        onClick={() => setUserProfile(false)}
      />
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Bài viết đã đánh dấu
      </h2>
      {loadingGetListBookMark ? (
        <div className="flex justify-center items-center h-[55vh]">
          <Spinner />
        </div>
      ) : markedList.length === 0 ? (
        <p className="text-gray-500">Bạn chưa đánh dấu bài viết nào.</p>
      ) : (
        <DragDropContext>
          <Droppable droppableId="marked-articles">
            {(provided) => (
              <ul
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-3 max-h-[400px] overflow-auto border-b pb-4"
              >
                {markedList.map((item, index) => (
                  <li
                    className={`relative transition flex`}
                    onClick={() => handleClickArticle(item.article.documentId)}
                    key={index}
                  >
                    <ArticleItem article={item.article} />
                    <button
                      className="text-red-500 text-[12px]"
                      onClick={(e) => {
                        // e.stopPropagation();
                        handleDeleteMarked(item.documentId);
                      }}
                    >
                      <MdOutlineDelete
                        size={20}
                        color="red"
                        title="Xóa đánh dấu"
                      />
                    </button>
                  </li>
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

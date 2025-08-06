import { useParams } from "react-router-dom";
import { list } from "../../assets/sampleData";
import { marked } from "marked";
import { BsSend } from "react-icons/bs";
import { FaRegBookmark } from "react-icons/fa";
import ArticleItem from "../../components/ArtileItem/ArticleItem";

function Article() {
  const { id } = useParams();
  const foundArticle = list.find((l) => l.id.toString() === id);

  return foundArticle ? (
    <div className="flex justify-between mt-3 text-[12px] h-[600px]">
      <div className="w-[73%]">
        <h1 className="font-bold text-[26px] p-4">{foundArticle.title}</h1>
        <div
          dangerouslySetInnerHTML={{ __html: marked(foundArticle.content) }}
          className="prose prose-sm lg:prose-lg max-w-none indent-8 leading-relaxed space-y-1 "
        ></div>
      </div>
      <div className="w-[26%] h-[600px] p-1 ">
        <div className="flex">
          <div className="flex items-center justify-center p-2 bg-gray-200 rounded m-2 mr-0 text-gray-500 hover:text-red-500 cursor-pointer">
            <BsSend className="mr-2" />
            <span>Share</span>
          </div>
          <div className="flex items-center justify-center p-2 bg-gray-200 rounded m-2 text-gray-500 hover:text-red-500 cursor-pointer">
            <FaRegBookmark className="mr-2" />
            <span>Mark</span>
          </div>
        </div>
        <div className="max-h-[650px] overflow-auto mt-2">
          <div className="flex items-center p-2 ">
            <span className="text-red-500 font-bold mr-2">■</span>
            <p className="font-medium">Tin tức tương tự</p>
          </div>

          {list.map((l, idx) => (
            <div key={idx} className="p-1 ">
              <ArticleItem article={l} />
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <div className="flex justify-center">
      <i>Xin lỗi. Chúng tôi không tìm được thông tin bài viết này!</i>
    </div>
  );
}

export default Article;

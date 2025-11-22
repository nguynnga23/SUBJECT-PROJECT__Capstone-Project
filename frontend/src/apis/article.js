export const getArticleCount = async () => {
  try {
    const response = await fetch("http://localhost:8080/v1/articles/count", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Lỗi ${response.status}: ${response.statusText}`);
    }

    const text = await response.text();
    return parseInt(text, 10);
  } catch (err) {
    console.error("Lỗi khi lấy số lượng bài viết:", err);
    throw err;
  }
};

export const getAllArticles = async ({ currentPage, itemsPerPage }) => {
  try {
    const response = await fetch(
      `http://localhost:8080/v1/articles?page=${currentPage}&pageSize=${itemsPerPage}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error("Lỗi từ server:", errorData || response.statusText);
      throw new Error(
        errorData?.message || `Lỗi ${response.status}: ${response.statusText}`
      );
    }
    return response.json();
  } catch (err) {
    console.error("Lỗi khi lấy danh sách bài viết", err);
    throw err;
  }
};

export const getArticleById = async (id) => {
  try {
    const response = await fetch(`http://localhost:8080/v1/articles/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error("Lỗi từ server:", errorData || response.statusText);
      throw new Error(
        errorData?.message || `Lỗi ${response.status}: ${response.statusText}`
      );
    }
    return response.json();
  } catch (err) {
    console.error("Lỗi khi lấy bài viết", err);
    throw err;
  }
};

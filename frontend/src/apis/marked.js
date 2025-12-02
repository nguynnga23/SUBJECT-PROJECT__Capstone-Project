export const postBookMark = async ({ userId, articleId }) => {
  try {
    const response = await fetch(`http://localhost:8080/v1/bookmarks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        articleId,
      }),
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
    console.error("Lỗi khi đánh dấu bài viết", err);
    throw err;
  }
};

export const checkBookMark = async ({ userId, articleId }) => {
  try {
    const response = await fetch(
      `http://localhost:8080/v1/bookmarks/check?userId=${userId}&articleId=${articleId}`,
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
    console.error("Lỗi khi lấy đánh dấu bài viết", err);
    throw err;
  }
};

export const deleteBookMarkById = async ({ bookmarkId }) => {
  try {
    const response = await fetch(
      `http://localhost:8080/v1/bookmarks/${bookmarkId}`,
      {
        method: "DELETE",
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
    console.error("Lỗi khi xóa đánh dấu bài viết", err);
    throw err;
  }
};

export const getBookMarkByUserId = async ({ userId }) => {
  try {
    const response = await fetch(
      `http://localhost:8080/v1/bookmarks/${userId}`,
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
    console.error("Lỗi khi lấy danh sách đánh dấu bài viết", err);
    throw err;
  }
};

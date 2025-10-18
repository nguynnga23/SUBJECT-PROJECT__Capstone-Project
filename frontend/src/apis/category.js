export const getAllCategory = async () => {
  try {
    // 1. Lấy danh sách tất cả watch (bản rút gọn)
    const response = await fetch(`http://localhost:8080/v1/categories`, {
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
    console.error("Lỗi khi lấy danh sách loại bài viết", err);
    throw err;
  }
};

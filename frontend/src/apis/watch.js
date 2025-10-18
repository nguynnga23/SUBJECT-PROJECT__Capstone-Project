export const getAllWatch = async () => {
  try {
    // 1. Lấy danh sách tất cả watch (bản rút gọn)
    const response = await fetch(`http://localhost:5000/api/v1/watch`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "db028c4e41297c6f7a146a115a256f6a",
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error("Lỗi từ server:", errorData || response.statusText);
      throw new Error(
        errorData?.message || `Lỗi ${response.status}: ${response.statusText}`
      );
    }

    const list = await response.json();

    // 2. Lấy chi tiết từng watch để lấy thêm paused
    const ids = Object.keys(list);

    const detailed = await Promise.all(
      ids.map(async (id) => {
        try {
          const detailRes = await fetch(
            `http://localhost:5000/api/v1/watch/${id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "x-api-key": "db028c4e41297c6f7a146a115a256f6a",
              },
            }
          );

          const detail = await detailRes.json();

          return { id, ...list[id], paused: detail.paused ?? false };
        } catch {
          return { id, ...list[id], paused: false };
        }
      })
    );

    return detailed;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách trang web theo dõi", error);
    throw error;
  }
};

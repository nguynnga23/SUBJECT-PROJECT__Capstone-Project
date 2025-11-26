export const getSearch = async (keyword) => {
  try {
    const response = await fetch("http://localhost:8080/v1/search/query", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: keyword,
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
    console.error("Lỗi khi tra cứu thông tin:", err);
    throw err;
  }
};

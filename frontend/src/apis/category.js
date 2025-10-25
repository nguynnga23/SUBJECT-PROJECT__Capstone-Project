export const getAllCategory = async () => {
  try {
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

export const getCategoryById = async (id) => {
  try {
    const response = await fetch(`http://localhost:8080/v1/categories/${id}`, {
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
    console.error("Lỗi khi lấy thông tin loại bài viết", err);
    throw err;
  }
};

export const postNewCategory = async ({
  category_name,
  category_url,
  department_source_id,
}) => {
  try {
    const response = await fetch(`http://localhost:8080/v1/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category_name,
        category_url,
        department_source_id,
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
    console.error("Lỗi khi lấy thông tin loại bài viết", err);
    throw err;
  }
};

export const deleteCategoryById = async (id) => {
  try {
    const response = await fetch(`http://localhost:8080/v1/categories/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || `Lỗi ${response.status}`);
    }

    return { message: "Xoá loại tin tức thành công", status: response.status };
  } catch (err) {
    console.error("Lỗi khi xoá loại tin tức:", err);
    throw err;
  }
};

export const putCategoryById = async ({ id, newCategory }) => {
  try {
    const response = await fetch(`http://localhost:8080/v1/categories/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCategory),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || `Lỗi ${response.status}`);
    }

    return {
      message: "Cập nhật category thành công",
      status: response.status,
    };
  } catch (err) {
    console.error("Lỗi khi cập nhật category:", err);
    throw err;
  }
};

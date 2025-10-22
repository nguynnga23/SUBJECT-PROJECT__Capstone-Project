export const getAllDepartmentSource = async () => {
  try {
    // 1. Lấy danh sách tất cả watch (bản rút gọn)
    const response = await fetch(
      `http://localhost:8080/v1/department-sources`,
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
    console.error("Lỗi khi lấy danh sách trang web theo dõi", err);
    throw err;
  }
};

export const getDepartmentSourceById = async (id) => {
  try {
    // 1. Lấy danh sách tất cả watch (bản rút gọn)
    const response = await fetch(
      `http://localhost:8080/v1/department-sources/${id}`,
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
    console.error("Lỗi khi lấy danh sách trang web theo dõi", err);
    throw err;
  }
};

export const postNewDepartmentSource = async ({
  department_id,
  label,
  url,
}) => {
  try {
    const existingList = await fetch(
      `http://localhost:8080/v1/department-sources`
    ).then((res) => res.json());

    const alreadyExists = existingList.find((item) => item.url === url);
    if (alreadyExists) {
      return { message: "URL đã tồn tại, không tạo mới", data: alreadyExists };
    }
    const response = await fetch(
      `http://localhost:8080/v1/department-sources`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          label,
          url,
          department_id,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || `Lỗi ${response.status}`);
    }

    return response.json();
  } catch (err) {
    console.error("Lỗi khi tạo trang mới", err);
    throw err;
  }
};

export const deleteDepartmentById = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:8080/v1/department-sources/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || `Lỗi ${response.status}`);
    }

    return { message: "Xoá department thành công", status: response.status };
  } catch (err) {
    console.error("Lỗi khi xoá department:", err);
    throw err;
  }
};

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
  // Tách key từ url
  const baseKey = url.match(/https?:\/\/(?:www\.)?([a-zA-Z0-9-]+)/)?.[1];
  if (!baseKey) throw new Error("URL không hợp lệ");

  try {
    // 1. Lấy danh sách hiện có
    const existingList = await fetch(
      `http://localhost:8080/v1/department-sources`
    ).then((res) => res.json());

    // 2. Check URL đã tồn tại chưa
    const alreadyExists = existingList.find((item) => item.url === url);
    if (alreadyExists) {
      return { message: "URL đã tồn tại, không tạo mới", data: alreadyExists };
    }

    // 3. Sinh key_departmentSource mới nếu trùng
    let newKey = baseKey;
    let counter = 1;
    while (existingList.some((item) => item.keyDepartmentSource === newKey)) {
      newKey = `${baseKey}${counter++}`;
    }
    // 4. Tạo mới
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
          keyDepartmentSource: newKey,
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

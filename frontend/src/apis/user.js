export const getAllUsers = async () => {
  try {
    const response = await fetch("http://localhost:1337/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
      },
      body: JSON.stringify({
        query: `
      query {
  usersPermissionsRoles {
    users {
      avatar {
        url
      },
      email,
      username,
      class,
      phone,
      fullName,
      studentID,
      createdAt,
      updatedAt,
      department {
        department_name
      }
    }
  }
}
    `,
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
    console.error("Lỗi khi lấy danh sách người dùng", err);
    throw err;
  }
};

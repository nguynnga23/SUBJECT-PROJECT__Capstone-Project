export const loginAsAdmin = async ({ email, password }) => {
  try {
    const response = await fetch("http://localhost:1337/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      const msg = data?.error?.message || "Đăng nhập thất bại";
      throw new Error(msg);
    }

    return data;
  } catch (err) {
    console.error("Lỗi khi đăng nhập:", err);
    throw err;
  }
};

export const register = async ({ email, username, password }) => {
  console.log({ email, username, password });

  try {
    const response = await fetch("http://localhost:8080/v1/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        username,
        password,
      }),
    });

    if (!response.ok) {
      throw new Error(`Lỗi ${response.status}: ${response.statusText}`);
    }

    return response.json();
  } catch (err) {
    console.error("Lỗi khi đăng ký tài khoản:", err);
    throw err;
  }
};

export const login = async ({ email, password }) => {
  try {
    const response = await fetch("http://localhost:8080/v1/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      throw new Error(`Lỗi ${response.status}: ${response.statusText}`);
    }

    return response.json();
  } catch (err) {
    console.error("Lỗi khi đăng nhập:", err);
    throw err;
  }
};

export const me = async () => {
  try {
    const root = JSON.parse(localStorage.getItem("persist:root"));
    const auth = JSON.parse(root.auth);
    const token = auth.token;

    const response = await fetch("http://localhost:8080/v1/auth/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Lỗi ${response.status}: ${response.statusText}`);
    }

    return response.json();
  } catch (err) {
    console.error("Lỗi khi lấy thông tin người dùng:", err);
    throw err;
  }
};

export const updateProfile = async ({ newProfile }) => {
  try {
    const root = JSON.parse(localStorage.getItem("persist:root"));
    const auth = JSON.parse(root.auth);
    const token = auth.token;

    const response = await fetch("http://localhost:8080/v1/auth/me", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ newProfile }),
    });

    if (!response.ok) {
      throw new Error(`Lỗi ${response.status}: ${response.statusText}`);
    }

    return response.json();
  } catch (err) {
    console.error("Lỗi khi cập nhật thông tin:", err);
    throw err;
  }
};

export const changePassword = async ({
  currentPassword,
  password,
  passwordConfirmation,
}) => {
  const auth = localStorage.getItem("auth");
  let token = "";

  if (auth) {
    token = JSON.parse(auth).token;
  }
  try {
    const response = await fetch(
      "http://localhost:8080/v1/auth/change-password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword,
          password,
          passwordConfirmation,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || `Lỗi ${response.status}: ${response.statusText}`
      );
    }

    return response.json();
  } catch (err) {
    console.error("Lỗi khi đổi mật khẩu:", err);
    throw err;
  }
};

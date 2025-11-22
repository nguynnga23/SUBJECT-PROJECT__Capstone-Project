export const getAllWatch = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/watch`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.REACT_APP_X_API_KEY,
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

    const ids = Object.keys(list);

    const detailed = await Promise.all(
      ids.map(async (id) => {
        try {
          const detailRes = await fetch(
            `${process.env.REACT_APP_API_URL}/watch/${id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "x-api-key": process.env.REACT_APP_X_API_KEY,
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

export const postNewWatch = async (watchData) => {
  try {
    const dataToSend = {
      include_filters: [".content"],
      ...watchData,
    };

    const response = await fetch(`${process.env.REACT_APP_API_URL}/watch`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.REACT_APP_X_API_KEY,
      },
      body: JSON.stringify(dataToSend),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Error: ${response.status} - ${errorData.message || "Unknown error"}`
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error posting watch:", error);
    return null;
  }
};

export const checkWatchNow = async (uuid) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/watch/${uuid}?recheck=1`,
      {
        method: "GET",
        headers: {
          "x-api-key": process.env.REACT_APP_X_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Error: ${response.status} - ${errorData.message || "Unknown error"}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error checking watch now:", error);
    return null;
  }
};

export const changePauseStatusWatch = async (uuid, status) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/watch/${uuid}`,
      {
        method: "PUT",
        headers: {
          "x-api-key": process.env.REACT_APP_X_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paused: status,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Error: ${response.status} - ${errorData.message || "Unknown error"}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error change pause status of watch now:", error);
    return null;
  }
};

export const sendMessageToWebhooksRightNow = async (url) => {
  try {
    const response = await fetch(
      `http://localhost:8001/webhook/changedetection`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `url:${url} | Test webhook from Changedetection.io. `,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Error: ${response.status} - ${errorData.message || "Unknown error"}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error checking watch now:", error);
    return null;
  }
};

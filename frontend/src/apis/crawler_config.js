export const postNewCrawlerConfig = async ({
  department_source_id,
  relative_url_list,
  relative_url,
  thumbnail,
  next_pages,
  title,
  content,
  external_publish_date,
}) => {
  try {
    const response = await fetch(`http://localhost:8080/v1/crawler-configs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        department_source_id,
        relative_url_list,
        relative_url,
        thumbnail,
        next_pages,
        title,
        content,
        external_publish_date,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || `Lỗi ${response.status}`);
    }

    return response.json();
  } catch (err) {
    console.error("Lỗi khi tạo cấu hình thu thập", err);
    throw err;
  }
};

export const putCrawlerConfig = async ({
  id,
  department_source_id,
  relative_url_list,
  relative_url,
  thumbnail,
  next_pages,
  title,
  content,
  external_publish_date,
}) => {
  console.log({
    id,
    department_source_id,
    relative_url_list,
    relative_url,
    thumbnail,
    next_pages,
    title,
    content,
    external_publish_date,
  });

  try {
    const response = await fetch(
      `http://localhost:8080/v1/crawler-configs/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          department_source_id,
          relative_url_list,
          relative_url,
          thumbnail,
          next_pages,
          title,
          content,
          external_publish_date,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || `Lỗi ${response.status}`);
    }

    return response.json();
  } catch (err) {
    console.error("Lỗi khi chỉnh sửa cấu hình thu thập", err);
    throw err;
  }
};

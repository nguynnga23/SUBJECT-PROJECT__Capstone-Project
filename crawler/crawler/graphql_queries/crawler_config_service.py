GET_CRAWLER_CONFIG = """
query ($category_url: String) {
  crawlerConfigs(
    filters: {
      department_source: {
        categories: {
          category_url: {
            eq: $category_url
          }
        }
      }
    }
  ) {
    department_source {
      documentId
      label
      url
      key_departmentSource
      categories {
        documentId
        key_category
        category_url
        category_name
        last_external_publish_date
      }
    }
    relative_url_list
    relative_url
    thumbnail
    next_pages
    title
    content
    external_publish_date
  }
}

        """
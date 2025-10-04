GET_CRAWLER_CONFIG = """
            query ($key_departmentSource: String, $key_category: String) {
                crawlerConfigs (
                  filters: {
                    department_source: {
                      key_departmentSource: { eq: $key_departmentSource }
                    }
                  }
                ) {
                    department_source {
                      documentId
                      label,
                      url,
                      key_departmentSource
                      categories (
                        filters: {
                          key_category: {
                            eq: $key_category
                          }
                        }
                      ){
                        documentId
                        key_category
                        category_url
                        category_name
                        last_external_publish_date
                      },
                    },
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
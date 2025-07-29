GET_CRAWLER_CONFIG = """
            query {
                crawlerConfigs {
                    department {
                        key_department
                        department_url
                        department_name
                        categories {
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
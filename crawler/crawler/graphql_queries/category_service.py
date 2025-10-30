GET_CATEGORY_BY_CATEGORY_URL_DEPARTMENT_URL = """
           query checkCategory($category_url: String!, $department_url: String!) {
            categories(
                 filters: {
                    category_url: { eq: $category_url }
                    department: {
                        department_url: { eq: $department_url }
                    }
                }
            ) {
                documentId
            }
        }
        """
        
UPDATE_LAST_DATE = """
            mutation updateCategory($id: ID!, $lastDate: Date!) {
                updateCategory(documentId: $id, data: {
                  last_external_publish_date: $lastDate
                }) {
                    key_category,
                    last_external_publish_date,
                    documentId
                }
            }
        """
FIND_KEY = """
                query ($url: String) {
                    categories (
                        filters: {
                            category_url: {eq: $url}
                        }
                    ) {
                        department_source {
                            url
                        }
                    }
                }
            """
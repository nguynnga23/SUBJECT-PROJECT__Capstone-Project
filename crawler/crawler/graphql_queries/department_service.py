GET_DEPARTMENT_BY_DEPARTMENT_URL = """
            query checkDepartment($url: String!) {
                departments(filters: { department_url: {eq: $url} }) {
                    documentId
                }
            }
        """
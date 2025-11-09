CREATE_ARTICLE = """
        mutation createArticle(
          $title: String!,
          $content: String!,
          $summary: String!,
          $thumbnail: String!,
          $external_slug: String!,
          $external_url: String!,
          $external_publish_date: Date!,
          $categoryId: ID!,
          $content_hash: String!
        ) {
          createArticle(
            data: {
              title: $title,
              content: $content,
              summary: $summary,
              thumbnail: $thumbnail,
              external_slug: $external_slug,
              external_url: $external_url,
              external_publish_date: $external_publish_date,
              category: $categoryId,
              content_hash: $content_hash
            }
          ) {
            documentId
            title
            summary
            thumbnail
            external_slug
            external_url
            external_publish_date
            category {
              documentId
            }
          }
        }
        """
        
        
IS_ARTICLE_EXIT = """
        query checkArticle($external_url: String!) {
            articles(filters: { external_url: { eq: $external_url } }) {
                title
            }
        }
        """
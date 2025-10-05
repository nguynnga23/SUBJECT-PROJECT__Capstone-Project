import uuid from "react-native-uuid";

const titles = [
  "Spring Boot Patterns Every Senior Should Know",
  "Why Microservices Are Out and Monoliths Are Coming Back",
  "Stop Using Microservices, Start Simple",
  "10 Tips for Becoming a Better Backend Engineer",
  "Frontend Frameworks in 2025: What’s Trending?",
];

const summaries = [
  "Quick insights into modern software practices.",
  "Lessons learned from scaling systems.",
  "Architecture patterns explained in detail.",
  "Best practices for production-ready apps.",
  "Exploring the future of fullstack development.",
];

const categories = ["Backend", "Frontend", "Architecture", "DevOps", "AI/ML"];

const thumbnails = [
  "https://picsum.photos/200/200?random=11",
  "https://picsum.photos/200/200?random=12",
  "https://picsum.photos/200/200?random=13",
  "https://picsum.photos/200/200?random=14",
  "https://picsum.photos/200/200?random=15",
];

function randomFrom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function createMockArticle(i) {
  return {
    id: uuid.v4(),
    title: randomFrom(titles),
    content: "This is mock content for article " + (i + 1),
    summary: randomFrom(summaries),
    thumbnail: randomFrom(thumbnails),
    external_url: "https://example.com/article-" + (i + 1),
    external_slug: "article-" + (i + 1),
    external_publish_date: "2024-0" + ((i % 9) + 1) + "-0" + ((i % 27) + 1),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    category: {
      id: (i % categories.length) + 1,
      name: randomFrom(categories),
    },
  };
}

export const mockArticles = Array.from({ length: 20 }, (_, i) =>
  createMockArticle(i)
);

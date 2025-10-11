import { getAxios } from "../utils/axios";

// Article list interface type
export interface Article {
  id: number;
  title: string;
  content: string;
  contentEng?: string;
  author?: string;
  shortUrl?: string;
  backgroundImageUrl?: string;
  createdAt: string;
  views?: number;
  updatedAt?: string;
  // New field: article excerpt (returned by backend)
  excerpt?: string;
  // New field: category (single)
  category?: { id?: number; name: string; color?: string } | string;
  // Tags array
  tags?: Array<{ id?: number; name: string; color?: string }>;
}

// Get article list (frontend merge: if category is passed, use category interface; otherwise use full interface)
export const getArticleList = (params?: { category?: string }) => {
  if (params?.category) {
    const category = encodeURIComponent(params.category);
    return getAxios<Article[]>({ url: `/article/category/${category}` });
  }
  return getAxios<Article[]>({ url: "/article" });
};

// Get article details by shortUrl
export const getArticleByShortUrl = (shortUrl: string) => {
  return getAxios<Article>({
    url: `/article/slug/${shortUrl}`,
  });
};

// Get article details by ID
export const getArticleById = (id: number) => {
  return getAxios<Article>({
    url: `/article/${id}`,
  });
};

// Filter articles by tags (supports multiple tags, OR relationship)
export const getArticlesByTags = (tagNames: string[]) => {
  // Filter empty strings and remove duplicates
  const validTags = tagNames
    .filter((tag) => tag && tag.trim())
    .map((tag) => tag.trim())
    .filter((tag, index, arr) => arr.indexOf(tag) === index);

  if (validTags.length === 0) {
    return Promise.reject(new Error("At least one valid tag is required"));
  }

  // Build query parameters, support multiple tags
  const params = validTags
    .map((tag) => `tags=${encodeURIComponent(tag)}`)
    .join("&");
  return getAxios<Article[]>({
    url: `/article/tags?${params}`,
  });
};

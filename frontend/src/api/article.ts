import { getAxios } from "../utils/axios";

// 文章列表接口类型
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
  // 新增字段：文章简介（由后端返回）
  excerpt?: string;
  // 新增字段：分类（单个）
  category?: { id?: number; name: string; color?: string } | string;
  // 可选：标签，如果后端返回
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tags?: any;
}

// 获取文章列表（前端合并：若传 category，走分类接口；否则走全量接口）
export const getArticleList = (params?: { category?: string }) => {
  if (params?.category) {
    const category = encodeURIComponent(params.category);
    return getAxios<Article[]>({ url: `/article/category/${category}` });
  }
  return getAxios<Article[]>({ url: "/article" });
};

// 通过 shortUrl 获取文章详情
export const getArticleByShortUrl = (shortUrl: string) => {
  return getAxios<Article>({
    url: `/article/slug/${shortUrl}`,
  });
};

// 通过 ID 获取文章详情
export const getArticleById = (id: number) => {
  return getAxios<Article>({
    url: `/article/${id}`,
  });
};

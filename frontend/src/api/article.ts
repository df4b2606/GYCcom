import { getAxios, postAxios, putAxios, deleteAxios } from "../utils/axios";

// 文章列表接口类型
export interface Article {
  id: number;
  title: string;
  content: string;
  contentEng?: string;
  author?: string;
  shortUrl?: string;
  createdAt: string;
  updatedAt?: string;
}

// 获取文章列表
export const getArticleList = () => {
  return getAxios<Article[]>({
    url: "/article",
  });
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

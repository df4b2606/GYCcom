import axiosInstance from "../utils/axios";

export interface LikeRequest {
  articleId: number;
  deviceId: string;
}

export interface LikeResponse {
  articleId: number;
  deviceId: string;
  isLiked: boolean;
  likeCount: number;
  message: string;
}

/**
 * Toggle like status for an article
 */
export const toggleLike = async (
  request: LikeRequest
): Promise<LikeResponse> => {
  const response = await axiosInstance.post<LikeResponse>(
    "/article/like",
    request
  );
  return response.data;
};

/**
 * Get like count for an article
 */
export const getLikeCount = async (articleId: number): Promise<number> => {
  const response = await axiosInstance.get<number>(
    `/article/${articleId}/like/count`
  );
  return response.data;
};

/**
 * Check if device has liked an article
 */
export const hasLiked = async (
  articleId: number,
  deviceId: string
): Promise<boolean> => {
  const response = await axiosInstance.get<boolean>(
    `/article/${articleId}/like/status`,
    {
      params: { deviceId },
    }
  );
  return response.data;
};

/**
 * Batch get like counts for multiple articles
 */
export const getLikeCountsBatch = async (
  articleIds: number[]
): Promise<Record<number, number>> => {
  const response = await axiosInstance.post<Record<number, number>>(
    "/article/like/counts/batch",
    articleIds
  );
  return response.data;
};

/**
 * Get popular articles by like count
 */
export const getPopularArticles = async (
  limit: number = 10
): Promise<number[]> => {
  const response = await axiosInstance.get<number[]>(
    `/article/like/popular?limit=${limit}`
  );
  return response.data;
};

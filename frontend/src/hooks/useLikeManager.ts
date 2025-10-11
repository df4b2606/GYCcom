import { useState, useEffect, useCallback } from "react";
import { getDeviceId } from "../utils/deviceId";
import { getLikeCountsBatch } from "../api/like";

interface UseLikeManagerProps {
  articleIds: number[];
}

interface LikeData {
  [articleId: number]: {
    count: number;
    isLiked: boolean;
  };
}

export const useLikeManager = ({ articleIds }: UseLikeManagerProps) => {
  const [likeData, setLikeData] = useState<LikeData>({});
  const [isLoading, setIsLoading] = useState(true);
  const [deviceId, setDeviceId] = useState<string>("");

  // Initialize device ID
  useEffect(() => {
    const id = getDeviceId();
    setDeviceId(id);
  }, []);

  // Fetch initial like data for all articles
  useEffect(() => {
    if (!deviceId || articleIds.length === 0) return;

    const fetchLikeData = async () => {
      setIsLoading(true);

      try {
        // Fetch like counts for all articles
        const counts = await getLikeCountsBatch(articleIds);

        // Initialize like data structure
        const initialData: LikeData = {};

        articleIds.forEach((id) => {
          initialData[id] = {
            count: counts[id] || 0,
            isLiked: false, // Will be updated by individual status checks
          };
        });

        setLikeData(initialData);

        // Fetch like status for each article (could be optimized with batch endpoint)
        const updatedData = { ...initialData };

        for (const articleId of articleIds) {
          try {
            // Note: This could be optimized with a batch endpoint
            const response = await fetch(
              `/api/article/${articleId}/like/status?deviceId=${deviceId}`
            );
            const isLiked = await response.json();
            updatedData[articleId].isLiked = isLiked;
          } catch (error) {
            console.error(
              `Failed to fetch like status for article ${articleId}:`,
              error
            );
          }
        }

        setLikeData(updatedData);
      } catch (error) {
        console.error("Failed to fetch like data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLikeData();
  }, [articleIds, deviceId]);

  // Update like count for a specific article
  const updateLikeCount = useCallback(
    (articleId: number, newCount: number, newIsLiked: boolean) => {
      setLikeData((prev) => ({
        ...prev,
        [articleId]: {
          count: newCount,
          isLiked: newIsLiked,
        },
      }));
    },
    []
  );

  // Get like data for a specific article
  const getLikeData = useCallback(
    (articleId: number) => {
      return likeData[articleId] || { count: 0, isLiked: false };
    },
    [likeData]
  );

  // Get total likes across all articles
  const getTotalLikes = useCallback(() => {
    return Object.values(likeData).reduce(
      (total, data) => total + data.count,
      0
    );
  }, [likeData]);

  // Get articles that user has liked
  const getLikedArticles = useCallback(() => {
    return Object.entries(likeData)
      .filter(([, data]) => data.isLiked)
      .map(([articleId]) => parseInt(articleId));
  }, [likeData]);

  return {
    likeData,
    isLoading,
    deviceId,
    updateLikeCount,
    getLikeData,
    getTotalLikes,
    getLikedArticles,
  };
};

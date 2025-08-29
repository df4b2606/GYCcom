import { getAxios, postAxios } from "../utils/axios";

// Tag interface type (aligned with backend Tag entity)
export interface Tag {
  id: number;
  name: string;
  description?: string;
  color?: string;
  isActive?: boolean;
  sortOrder?: number;
  usageCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

// Get all active tags
export const getTagList = () => {
  return getAxios<Tag[]>({ url: "/api/tags" });
};

// Get tag by ID
export const getTagById = (id: number) => {
  return getAxios<Tag>({ url: `/api/tags/${id}` });
};

// Get tag by name
export const getTagByName = (name: string) => {
  const encoded = encodeURIComponent(name);
  return getAxios<Tag>({ url: `/api/tags/name/${encoded}` });
};

// Create a new tag
export const createTag = (payload: {
  name: string;
  description?: string;
  color?: string;
}) => {
  return postAxios<Tag, typeof payload>({ url: "/api/tags", data: payload });
};

// Find or create a tag by name
export const findOrCreateTag = (name: string) => {
  return postAxios<Tag, { name: string }>({
    url: "/api/tags/find-or-create",
    data: { name },
  });
};

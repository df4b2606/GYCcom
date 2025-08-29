import { getAxios, postAxios, putAxios, deleteAxios } from "../utils/axios";

// Category interface type
export interface Category {
  id: number;
  name: string;
  color?: string;
  articles?: Array<{ id: number; title: string; shortUrl?: string }>;
}

// Get all categories list
export const getCategoryList = () => {
  return getAxios<Category[]>({ url: "/category" });
};

// Get category by ID
export const getCategoryById = (id: number) => {
  return getAxios<Category>({
    url: `/category/${id}`,
  });
};

// Get category by name
export const getCategoryByName = (name: string) => {
  const encodedName = encodeURIComponent(name);
  return getAxios<Category>({
    url: `/category/name/${encodedName}`,
  });
};

// Create new category
export const createCategory = (category: { name: string; color?: string }) => {
  return postAxios<Category>({
    url: "/category",
    data: category,
  });
};

// Update category
export const updateCategory = (
  id: number,
  category: { name?: string; color?: string }
) => {
  return putAxios<Category>({
    url: `/category/${id}`,
    data: category,
  });
};

// Delete category
export const deleteCategory = (id: number) => {
  return deleteAxios<void>({
    url: `/category/${id}`,
  });
};

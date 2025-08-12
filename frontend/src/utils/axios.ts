import axios, { AxiosResponse } from "axios";

// API response type
export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  status: number;
}

// API error type
export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}

// API config
const config = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080",
  timeout: 10000,
};

// Create axios instance
const instance = axios.create({
  baseURL: config.baseURL,
  timeout: config.timeout,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request options type
export interface RequestOptions<T = unknown> {
  url: string;
  params?: Record<string, string | number | boolean>;
  data?: T;
}

// Unified response wrapper function
// (interface is only for checking if the returned data type is correct)
function wrapResponse<T>(axiosResponse: AxiosResponse): ApiResponse<T> {
  return {
    data: axiosResponse.data,
    message: axiosResponse.statusText || "success",
    status: axiosResponse.status,
  };
}

// GET request
export async function getAxios<T>({
  url,
  params = {},
}: RequestOptions): Promise<ApiResponse<T>> {
  try {
    const response = await instance.get(url, { params });
    return wrapResponse<T>(response);
  } catch (error) {
    handleRequestError(error);
    throw error;
  }
}

// POST request
export async function postAxios<T, D = unknown>({
  url,
  data,
  params = {},
}: RequestOptions<D>): Promise<ApiResponse<T>> {
  try {
    const response = await instance.post(url, data, { params });
    return wrapResponse<T>(response);
  } catch (error) {
    handleRequestError(error);
    throw error;
  }
}

// PUT request
export async function putAxios<T, D = unknown>({
  url,
  data,
  params = {},
}: RequestOptions<D>): Promise<ApiResponse<T>> {
  try {
    const response = await instance.put(url, data, { params });
    return wrapResponse<T>(response);
  } catch (error) {
    handleRequestError(error);
    throw error;
  }
}

// DELETE request
export async function deleteAxios<T>({
  url,
  data,
  params = {},
}: RequestOptions): Promise<ApiResponse<T>> {
  try {
    const response = await instance.delete(url, {
      params,
      data,
    });
    return wrapResponse<T>(response);
  } catch (error) {
    handleRequestError(error);
    throw error;
  }
}

// Unified error handler
function handleRequestError(error: unknown) {
  if (axios.isAxiosError(error)) {
    const { response, request, message } = error;
    if (response) {
      const status = response.status;
      const errorMessage = response.data?.message || "Unknown error";
      console.error(`HTTP error ${status}:`, errorMessage);
    } else if (request) {
      console.error("Network error, please check your connection");
    } else {
      console.error("Request config error:", message);
    }
  } else {
    console.error("Unknown error:", error);
  }
}
export default instance;

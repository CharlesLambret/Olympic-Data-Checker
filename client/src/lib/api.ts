const API_URL = import.meta.env.VITE_API_URL as string;

interface FetchOptions extends RequestInit {
  body?: any;
}

const checkResponse = async (response: Response) => {
  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
  return response.json();
};

const fetchData = async <T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> => {
  const url = `${API_URL}${endpoint}`;
  const defaultOptions: FetchOptions = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const fetchOptions = {
    ...defaultOptions,
    ...options,
    body: options.body ? JSON.stringify(options.body) : undefined,
  };

  const response = await fetch(url, fetchOptions);
  return checkResponse(response);
};

export const get = <T>(endpoint: string): Promise<T> => fetchData<T>(endpoint);

export const post = <T>(endpoint: string, body: any): Promise<T> =>
  fetchData<T>(endpoint, {
    method: "POST",
    body,
  });

export const put = <T>(endpoint: string, body: any): Promise<T> =>
  fetchData<T>(endpoint, {
    method: "PUT",
    body,
  });

export const patch = <T>(endpoint: string, body: any): Promise<T> =>
  fetchData<T>(endpoint, {
    method: "PATCH",
    body,
  });

export const remove = <T>(endpoint: string): Promise<T> =>
  fetchData<T>(endpoint, {
    method: "DELETE",
  });

export default {
  get,
  post,
  put,
  patch,
  remove,
};

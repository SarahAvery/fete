import { getToken } from "./authUtils";

/**
 * Fetch wrapper that automatically adds the authorization headers for api requests
 */
export const apiRequest = (url, options) => {
  const defaultUrl = process.env.REACT_APP_API_URL;
  const defaultOptions = {
    method: "POST",
    headers: { authorization: `Bearer: ${getToken()}` },
  };

  return fetch(url || defaultUrl, {
    ...defaultOptions,
    ...options,
    headers: { ...defaultOptions.headers, ...options.headers },
  });
};

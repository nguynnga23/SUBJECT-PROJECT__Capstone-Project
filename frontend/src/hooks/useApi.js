// src/hooks/useApi.js
import { useState } from "react";

export function useApi(apiFunc) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = async (...args) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiFunc(...args);
      return response;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { request, loading, error };
}

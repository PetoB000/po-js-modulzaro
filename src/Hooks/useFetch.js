import { useState, useEffect, useCallback } from "react";

export default function useFetch(endpoint, options = { method: "GET" }) {
  const [data, setData] = useState(null);

  const fetchData = useCallback(
    async (requestOptions = {}) => {
      try {
        const response = await fetch(
          `http://salonsapi.prooktatas.hu/api${endpoint}`,
          {
            method: options.method,
            headers: {
              "Content-Type": "application/json",
            },
            ...requestOptions,
          }
        );
        const result = await response.json();
        setData(result);

        return result;
      } catch (error) {
        console.log(error);
      }
    },
    [endpoint, options.method]
  );

  useEffect(() => {
    if (options.method === "GET") {
      fetchData();
    }
  }, [endpoint, fetchData, options.method]);

  return options.method === "GET" ? data : fetchData;
}

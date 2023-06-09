import { useState, useEffect } from "react";

const useFetch = (url: string, fetchApi: (url: string) => Promise<any>) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true; // Flag to track if the component is still mounted

    const fetchData = async (): Promise<void> => {
      try {
        const res = await fetchApi(url);
        if (isMounted) {
          if (res) {
            setData(res.data);
            setLoading(false);
          } else {
            setLoading(false);
            setError(true);
          }
        }
      } catch (error) {
        if (isMounted) {
          setLoading(false);
          setError(true);
        }
      }
    };

    fetchData();

    return () => {
     
      isMounted = false;
    };
  }, [url]); 

  return { loading, data, error };
};

export default useFetch;

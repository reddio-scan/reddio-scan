import axios from 'axios';
import { useState, useEffect } from 'react';

const useAxiosGet = (
  url: string,
): { data: any; loading: boolean; error: any } => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response = await axios.get(url);
        setData(response.data);
      } catch (error: any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData().catch((error: any) => {
      setError(error);
    });
  }, [url]);

  return { data, loading, error };
};
export default useAxiosGet;

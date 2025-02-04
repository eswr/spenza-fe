import { useState, useEffect } from 'react';
import axios from 'axios';

const useLongPolling = (url, interval = 5000) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        if (isMounted) {
          setData(response.data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    const intervalId = setInterval(fetchData, interval);
    fetchData(); // Initial fetch

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [url, interval]);

  return { data, error, loading };
};

export default useLongPolling;

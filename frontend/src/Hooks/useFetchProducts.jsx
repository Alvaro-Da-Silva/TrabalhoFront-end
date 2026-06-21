import { useState, useEffect } from 'react';

export function useFetchProducts(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductsData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error('Não foi possível buscar os dados dos produtos.');
        }
        
        const json = await response.json();
        console.log(json)
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsData();
  }, [url]); 

  return { data, loading, error };
}
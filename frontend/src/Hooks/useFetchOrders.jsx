import React, { useEffect,useState } from "react";

export function useFetchOrders(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrdersData = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(url);

        if (!res.ok) {
          throw new error("Não foi possivel buscar as ordens do usuário");
        }

        const json = await res.json();
        setData(json);
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    };

    fetchOrdersData()
  },[url]);

  return { data, loading, error};
}

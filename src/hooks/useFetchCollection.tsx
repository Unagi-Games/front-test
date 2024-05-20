import { useEffect, useState } from "react";
import { fetchCollection } from "../lib/collection";
import { Player } from "../types";

export const useFetchCollections = () => {

  const [data, setdata] = useState<Player[]>([]);
  const [loading, setloading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');


  const fetchPlayer = () => {
    setloading(true);
    fetchCollection().then((res => {
      setdata([...res.data]);
      setloading(false);
    })).catch((err) => {
      setError('Failed to Fetch Collection');
      setloading(false);
    })

  }

  useEffect(() => {
    fetchPlayer();
  }, []);


  return { data, loading, error, fetchPlayer, setdata }

}








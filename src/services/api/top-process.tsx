import {useQuery} from "@tanstack/react-query";
import axios from "axios";

export const useTopProcess = (
  date: number,
  enabled: boolean,
) => {
  const fetchInventory = async () => {
    const res = await axios.get(`http://localhost:3000/process/top-active/${date} `, );
    return res?.data || {};
  };

  return useQuery({
    queryFn: fetchInventory,
    queryKey: ['getTopProcess'],
    refetchOnWindowFocus: false,
    retry: enabled,
    enabled: enabled,
  });
};

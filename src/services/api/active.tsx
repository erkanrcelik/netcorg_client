import {useQuery} from "@tanstack/react-query";
import axios from "axios";

export const useActiveProcess = (
  date: number,
  enabled: boolean,
  onError?: any
) => {
  const fetchInventory = async () => {
    const res = await axios.get(`http://localhost:3000/process/active/${date} `, );
    return res?.data || {};
  };

  return useQuery({
    queryFn: fetchInventory,
    queryKey: ['getActiveProcess'],
    throwOnError: onError,
    refetchOnWindowFocus: false,
    retry: enabled,
    enabled: enabled,
  });
};

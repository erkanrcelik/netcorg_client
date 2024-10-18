import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {ProcessRequest} from "@/services/types/process";

export const useProcess = (filters: ProcessRequest, onError?: any) => {
  const fetchInventory = async () => {
    const res = await axios.get('http://localhost:3000/process', { params: filters });
    return res?.data || {};
  };
  return useQuery({
    queryFn: fetchInventory,
    queryKey: ['getProcess'],
    throwOnError: onError,
    refetchOnWindowFocus:false
  })
};


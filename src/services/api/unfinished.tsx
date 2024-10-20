import {useQuery} from "@tanstack/react-query";
import axios from "axios";

interface Filters{
  offset:number
  limit:number
}

export const useUnfinishedProcess = (filters:Filters) => {
  const fetchInventory = async () => {
    const res = await axios.get('http://localhost:3000/process/unfinishedProcess', {params: filters});
    return res?.data || {};
  };
  return useQuery({
    queryFn: fetchInventory,
    queryKey: ['getunfinishedProcess'],
    refetchOnWindowFocus:false
  })
};


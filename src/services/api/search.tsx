import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {SearchProcessRequest} from "@/services/types/search";


export const useSearchProcess = (filters: SearchProcessRequest, onError?: any) => {
  const fetchInventory = async () => {
    const params: Record<string, any> = {};

    if (filters.title) params.title = filters.title;
    if (filters.aname) params.aname = filters.aname;
    if (filters.pname) params.pname = filters.pname;
    if (filters.start_time) params.start_time = filters.start_time;
    if (filters.totalDuration) params.totalDuration = filters.totalDuration;

    // Add pagination fields
    params.limit = filters.limit;
    params.offset = filters.offset;

    const res = await axios.get('http://localhost:3000/process/search', { params });
    return res?.data || {};
  };

  return useQuery({
    queryFn: fetchInventory,
    queryKey: ['searchProcess', filters], // Include filters in the queryKey for caching
    throwOnError: onError,
    refetchOnWindowFocus: false,
  });
};

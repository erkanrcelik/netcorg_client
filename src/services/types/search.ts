export interface SearchProcessRequest {
  limit: number;
  offset: number;
  title?: string | null | undefined;
  aname?: string | null | undefined;
  pname?: string | null | undefined;
  start_time?: string | null | undefined;
  totalDuration?: string | null | undefined;
}
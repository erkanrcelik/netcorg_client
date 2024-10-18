export interface ActiveProcessResponse {
  uuid: string;
  ppid: number;
  pid: number;
  pname: string;
  aname: string;
  title: string;
  start_time: string;
  end_time: string;
  totalDuration: number;
}

export interface ActiveProcessRequest {
  date: string;
}



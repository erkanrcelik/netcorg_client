export interface ProcessResponseItem {
  uuid: string;
  ppid: number;
  pid: number;
  pname: string;
  aname: string;
  title: string;
  start_time: number;
  end_time: number;
  totalDuration: number;
  appIcon: string;
}

export interface ProcessRequest {
  limit: number;
  offset: number;
  date: number;
  isActive: boolean;
}

export enum SummaryTabEnum {
  TopActiveProcess = 'top_active_process',
  TopAppList = 'top_app_list',
  TopTitle = 'top_title'
}

export interface TopActiveProcessData {
  aname: string;
  pname: string;
  totalDuration: number;
}

export interface TopAppListData {
  aname: string;
  pname: string;
  totalDuration: number;
}

export interface TopTitleData {
  title: string;
  aname: string;
  totalDuration: number;
}


export interface SummaryTabItem{
  title: string;
  name: SummaryTabEnum;
  isActive?: boolean;
  data: TopActiveProcessData[] | TopAppListData[] | TopTitleData[];
}

export const summaryTabItems: SummaryTabItem[] = [
  {
    title: 'Top Active Process',
    name: SummaryTabEnum.TopActiveProcess,
    isActive: true,
    data: []
  },
  {
    title: 'Top App List',
    name: SummaryTabEnum.TopAppList,
    isActive: false,
    data: []
  },
  {
    title: 'Top Title',
    name: SummaryTabEnum.TopTitle,
    isActive: false,
    data: []
  }
];



import React, {useEffect, useState} from "react";
import {formatDuration} from "@/utils/time";
import {ProcessResponseItem, SummaryTabEnum} from "@/services/types/process";
import {Button} from "@/components/ui/button";
import {Icons} from "@/components/icons";

interface ProcessListProps {
  items: ProcessResponseItem[];
  offset: number;
  limit: number;
  total: number;
  appIcon: string;
  name: string;
  onPageChange: (newOffset: number) => void;
}

export function ProcessList(props: ProcessListProps) {
  const {items, total, name, onPageChange} = props;
  const [page, setPage] = useState(0);

  const pageCount = Math.ceil(total / props.limit);

  const [durations, setDurations] = useState<Record<string, number>>({});
  const [finishedStates, setFinishedStates] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const newDurations: Record<string, number> = {};
    const newFinishedStates: Record<string, boolean> = {};

    items?.forEach((item) => {
      if (item.end_time) {
        newFinishedStates[item.uuid] = true;
      } else {
        newFinishedStates[item.uuid] = false;
        newDurations[item.uuid] = Math.floor((Date.now() / 1000) - item.start_time);
      }
    });

    setFinishedStates(newFinishedStates);
    setDurations(newDurations);
  }, [items]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDurations((prevDurations) => {
        const updatedDurations = {...prevDurations};

        items.forEach((item) => {
          if (!finishedStates[item.uuid]) {
            updatedDurations[item.uuid] = Math.floor((Date.now() / 1000) - item.start_time);
          }
        });

        return updatedDurations;
      });
    }, 5000);

    return () => clearInterval(intervalId);
  }, [finishedStates, items]);

  type ProcessResponseItemKey = keyof ProcessResponseItem;

  interface ColumnConfig {
    label: string;
    key: ProcessResponseItemKey; // Ensure key is of the type of keys in ProcessResponseItem
    render?: (item: ProcessResponseItem) => React.ReactNode; // Optional render function
  }

  const columnConfig: Record<SummaryTabEnum, ColumnConfig[]> = {
    [SummaryTabEnum.TopActiveProcess]: [
      {
        label: "App Icon",
        key: "appIcon",
        render: (item) => <img src={item.appIcon} width={25} height={20} alt="App Icon"/>
      },
      {label: "Application Name", key: "aname"},
      {label: "Process Name", key: "pname"},
      {label: "Duration", key: "totalDuration", render: (item) => formatDuration(durations[item.uuid] || 0)}
    ],
    [SummaryTabEnum.TopAppList]: [
      {
        label: "App Icon",
        key: "appIcon",
        render: (item) => <img src={item.appIcon} width={25} height={20} alt="App Icon"/>
      },
      {label: "Application Name", key: "aname"},
      {label: "Process Name", key: "pname"},
      {label: "Total Duration", key: "totalDuration", render: (item) => formatDuration(item.totalDuration)}
    ],
    [SummaryTabEnum.TopTitle]: [
      {
        label: "App Icon",
        key: "appIcon",
        render: (item) => <img src={item.appIcon} width={25} height={20} alt="App Icon"/>
      },
      {label: "Title", key: "title"},
      {label: "Application Name", key: "aname"},
      {label: "Total Duration", key: "totalDuration", render: (item) => formatDuration(item.totalDuration)}
    ]
  };

  const getColumnConfig = (tab: SummaryTabEnum): ColumnConfig[] => columnConfig[tab] || [];

  const columns = getColumnConfig(name as SummaryTabEnum); // Get columns based on selected tab

  const handlePrevPage = () => {
    if (page > 0) {
      onPageChange(page - 1);
      setPage(page - 1)
    }
  };

  const handleNextPage = () => {
    if (page < total) {
      onPageChange(page + 1);
      setPage(page + 1)
    }
  };

  return (
    <div className="flex flex-col">
      <table className="min-w-full">
        <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.label} className="py-2 px-4 text-left">
              {column.label}
            </th>
          ))}
        </tr>
        </thead>
        <tbody>
        {items?.length > 0 ? items.map((item) => (
            <tr key={item.uuid} className="border-b">
              {columns.map((column) => (
                <td key={column.key} className="py-2 px-4">
                  {column.render ? column.render(item) : item[column.key]}
                </td>
              ))}
            </tr>
          ))
          : (
            <>
              <tr>
                <td colSpan={columns.length} className="py-2 px-4 text-center text-red-500">
                  No data available
                </td>
              </tr>
            </>
          )
        }
        </tbody>
      </table>

      {
        items?.length > 0 && (
          <div className="flex justify-between mt-4">
            <Button
              onClick={handlePrevPage}
              disabled={page === 0}
              size={"sm"}
              className={`px-4 py-2 rounded ${page === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <Icons.chevronLeft color="white" size={15}/>
            </Button>
            <span>
          Page {page + 1} of {pageCount}
        </span>
            <Button
              onClick={handleNextPage}
              size={"sm"}
              disabled={page === pageCount - 1}
              className={`px-4 py-2 rounded ${page === total ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <Icons.chevronRight color="white" size={15}/>
            </Button>
          </div>
        )
      }
    </div>
  );
}

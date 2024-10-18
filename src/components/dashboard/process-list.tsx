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
  const { items, total, name, offset, limit, onPageChange } = props;

  const totalPages = Math.ceil(total / limit);
  const currentPage = Math.floor(offset / limit) + 1;

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(offset - limit);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(offset + limit);
    }
  };

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
        const updatedDurations = { ...prevDurations };

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
        render: (item) => <img src={item.appIcon} width={25} height={20} alt="App Icon" />
      },
      { label: "Aname", key: "aname" },
      { label: "Pname", key: "pname" },
      { label: "Duration", key: "totalDuration", render: (item) => formatDuration(durations[item.uuid] || 0) }
    ],
    [SummaryTabEnum.TopAppList]: [
      {
        label: "App Icon",
        key: "appIcon",
        render: (item) => <img src={item.appIcon} width={25} height={20} alt="App Icon" />
      },
      { label: "Aname", key: "aname" },
      { label: "Pname", key: "pname" },
      { label: "Total Duration", key: "totalDuration", render: (item) => formatDuration(item.totalDuration) }
    ],
    [SummaryTabEnum.TopTitle]: [
      {
        label: "App Icon",
        key: "appIcon",
        render: (item) => <img src={item.appIcon} width={25} height={20} alt="App Icon" />
      },
      { label: "Title", key: "title" },
      { label: "Aname", key: "aname" },
      { label: "Total Duration", key: "totalDuration", render: (item) => formatDuration(item.totalDuration) }
    ]
  };

  const getColumnConfig = (tab: SummaryTabEnum): ColumnConfig[] => columnConfig[tab] || [];

  const columns = getColumnConfig(name as SummaryTabEnum); // Get columns based on selected tab

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
        {items && items.map((item) => (
          <tr key={item.uuid} className="border-b">
            {columns.map((column) => (
              <td key={column.key} className="py-2 px-4">
                {column.render ? column.render(item) : item[column.key]}
              </td>
            ))}
          </tr>
        ))}
        </tbody>
      </table>

      <div className="flex justify-between mt-4">
        <Button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          size={"sm"}
          className={`px-4 py-2 rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <Icons.chevronLeft color="white" size={15} />
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={handleNextPage}
          size={"sm"}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <Icons.chevronRight color="white" size={15} />
        </Button>
      </div>
    </div>
  );
}

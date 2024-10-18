import React from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {ProcessList} from "@/components/dashboard/process-list";
import {PieGraph} from "@/components/custom/charts/pie-graph";
import {Separator} from "@/components/ui/separator";
import {useDate} from "@/hooks/use-date";
import {ProcessRequest, ProcessResponseItem} from "@/services/types/process";

interface SummaryTabContentProps {
  title: string;
  name: string;
  items: ProcessResponseItem[];
  offset: number;
  limit: number;
  total: number;
  isLoading: boolean;
  processFilters: ProcessRequest;
  setProcessFilters: (filters: ProcessRequest) => void;
}

const SummaryTabContent = (props: SummaryTabContentProps) => {
  const { date } = useDate();
  const { title, items, total, name, offset, limit, processFilters, setProcessFilters } = props;

  const onPageChange = (newOffset: number) => {
    setProcessFilters({ ...processFilters, offset: newOffset });
  }

  return (
    <Card className="p-0">
      <CardHeader className="border-b">
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          Showing all data for the {date.toDateString()}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="md:flex space-x-4 max-h-[46.5vh]">
          <div className="flex-grow p-4 overflow-auto">
            <ProcessList
              items={items}
              limit={limit}
              total={total}
              offset={offset}
              name={name}
              appIcon={'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Google_Chrome_icon_%28February_2022%29.svg/1024px-Google_Chrome_icon_%28February_2022%29.svg.png'}
              onPageChange={onPageChange}
            />
          </div>
          <div className="w-5">
            <Separator orientation={"vertical"} />
          </div>
          <div className="flex-grow p-4">
            <PieGraph items={items} name={name} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SummaryTabContent;

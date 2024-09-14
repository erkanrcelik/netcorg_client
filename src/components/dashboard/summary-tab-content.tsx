import React from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {RecentSales} from "@/components/recent-sales";
import {PieGraph} from "@/components/custom/charts/pie-graph";
import {Separator} from "@/components/ui/separator";

interface SummaryTabContentProps {
  title?: string;
}

const SummaryTabContent = (props:SummaryTabContentProps) => {
  const {title} = props;
  return (
    <Card className="p-0">
      <CardHeader className="border-b">
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          Showing all data for the Jan 20, 2023 - Feb 09, 2023
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="md:flex space-x-4 max-h-[46.5vh]">
          <div className="flex-grow p-4 overflow-auto">
            <RecentSales/>
          </div>
          <div className="w-5">
            <Separator orientation={"vertical"}/>
          </div>
          <div className="flex-grow p-4">
            <PieGraph/>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SummaryTabContent;
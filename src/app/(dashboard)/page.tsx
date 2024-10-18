import React from 'react';
import PageContainer from "@/components/shared/page-container";
import {CalendarDateRangePicker} from "@/components/dashboard/date-range-picker";
import DashboardTabsLists from "@/components/dashboard/dashboard-tabs-list";
import SummaryTab from "@/components/dashboard/summary-tab";
import BrowserTab from "@/components/dashboard/browser-tab";
import {Tabs} from "@/components/ui/tabs";

const Page = () => {
  return (
    <>
      <PageContainer scrollable={false}>
        <Tabs defaultValue="summary" className="space-y-4">
          <div className="grid justify-between grid-cols-1 md:grid-cols-2 gap-4 md:gap-0">
            <div>
              <DashboardTabsLists/>
            </div>
            <CalendarDateRangePicker/>
          </div>
          <SummaryTab/>
          <BrowserTab/>
        </Tabs>
      </PageContainer>
    </>
  );
};

export default Page;
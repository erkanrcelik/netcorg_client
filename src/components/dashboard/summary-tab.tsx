"use client"
import React from 'react';
import {TabsContent} from "@/components/ui/tabs";
import DashboardOverviewCard, {DashboardOverviewCardProps} from "@/components/dashboard/dashboard-overview-card";
import SummaryTabContent from "@/components/dashboard/summary-tab-content";

const data: DashboardOverviewCardProps[] = [
  {
    cardName: "active_process",
    cardTitle: "Active Procces",
    appName: "Google Chromeasdasdasdsaadsdasdasasddsasdasdasasdasdasdasas",
    appIcon: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Google_Chrome_icon_%28February_2022%29.svg/1024px-Google_Chrome_icon_%28February_2022%29.svg.png",
    pName: "Google Chrome",
    duration: "1h 30m",
  }, {
    cardName: "app_list",
    cardTitle: "App List",
    appName: "Spotify",
    appIcon: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Google_Chrome_icon_%28February_2022%29.svg/1024px-Google_Chrome_icon_%28February_2022%29.svg.png",
    duration: "1h 30m",
  },
  {
    cardName: "title",
    cardTitle: "Title",
    title: "Title",
    appName: "Spotify",
    appIcon: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Google_Chrome_icon_%28February_2022%29.svg/1024px-Google_Chrome_icon_%28February_2022%29.svg.png",
    duration: "1h 30m",
  },
  {
    cardName: "browser_title",
    cardTitle: "Browser Title",
    title: "Title",
    appName: "Spotify",
    appIcon: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Google_Chrome_icon_%28February_2022%29.svg/1024px-Google_Chrome_icon_%28February_2022%29.svg.png",
    duration: "1h 30m",
  },
  {
    cardName: "categories",
    cardTitle: "Categories",
    categoryName: "Social Media",
    categoryIcon: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Google_Chrome_icon_%28February_2022%29.svg/1024px-Google_Chrome_icon_%28February_2022%29.svg.png",
    duration: "1h 30m",
  },
  {
    cardName: "asdjads",
    cardTitle: "ASDASJASDAS",
    categoryName: "Social Media",
    categoryIcon: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Google_Chrome_icon_%28February_2022%29.svg/1024px-Google_Chrome_icon_%28February_2022%29.svg.png",
    duration: "1h 30m",
  }
]

const SummaryTab = () => {
  const [value, setValue] = React.useState("summary");
  console.log(value)
  return (
    <TabsContent value="summary" className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {data.map((item, index) => (
          <DashboardOverviewCard onClick={() => setValue(item.cardName)} key={index} {...item} />
        ))}
      </div>
      <SummaryTabContent/>
    </TabsContent>
  );
};

export default SummaryTab;
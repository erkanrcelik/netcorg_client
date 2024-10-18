"use client";
import React, {useEffect, useState} from 'react';
import {TabsContent} from "@/components/ui/tabs";
import SummaryTabContent from "@/components/dashboard/summary-tab-content";
import DashboardOverviewCard from "@/components/dashboard/dashboard-overview-card";
import {useActiveProcess} from "@/services/api/active";
import {useDate} from "@/hooks/use-date";
import {dateToEpoch} from "@/utils/time";
import {useTopProcess} from "@/services/api/top-process";
import {ProcessRequest, SummaryTabItem, summaryTabItems} from "@/services/types/process";
import {useProcess} from "@/services/api/process";

const SummaryTab = () => {
  const {date} = useDate();
  const initialProcessFilters: ProcessRequest = {
    limit: 7,
    offset: 0,
    date: dateToEpoch(date),
    isActive: true
  };
  const [selectedTab, setSelectedTab] = useState<SummaryTabItem>(summaryTabItems[0]);
  const [activeProcessFilters, setActiveProcessFilters] = useState(dateToEpoch(date));
  const [processFilters, setProcessFilters] = useState<ProcessRequest>(initialProcessFilters);
  const [topProcessFilters, setTopProcessFilters] = useState(dateToEpoch(date));
  const [isFailure, setIsFailure] = useState<boolean>(false);
  const onErrorFetch = () => setIsFailure(true);

  const {
    data: activeProcessData,
    refetch: activeProcessRefetch,
    isLoading: activeProcessIsLoading,
  } = useActiveProcess(
    activeProcessFilters,
    selectedTab.name === 'top_active_process',
    onErrorFetch
  );

  const {
    data: topProcessData,
    refetch: topProcessRefetch,
    isLoading: topProcessIsLoading,
  } = useTopProcess(
    topProcessFilters,
    selectedTab.name === 'top_app_list',
    onErrorFetch
  );

  const {
    data: processData,
    refetch: processRefetch,
    isLoading: processIsLoading,
  } = useProcess(
    processFilters,
    onErrorFetch
  );

  console.log(processData)

  useEffect(() => {
    setActiveProcessFilters(dateToEpoch(date));
    setTopProcessFilters(dateToEpoch(date));
    setProcessFilters({
      ...processFilters,
      date: dateToEpoch(date)
    });
  }, [date]);

  useEffect(() => {
    processRefetch();
  }, [processFilters, processRefetch]);

  useEffect(() => {
    topProcessRefetch();
  }, [topProcessFilters, topProcessRefetch]);

  useEffect(() => {
    activeProcessRefetch();
  }, [activeProcessFilters, activeProcessRefetch]);

  const handleCardClick = (tab: SummaryTabItem) => {
    setSelectedTab(tab);
    if (tab.name === 'top_active_process') {
      setProcessFilters(initialProcessFilters);
    } else {
      setProcessFilters({...initialProcessFilters, isActive: false});
    }
    processRefetch();
  };

  const cardsData = [
    {
      key: summaryTabItems[0].name,
      data: activeProcessData,
      isLoading: activeProcessIsLoading,
      title: summaryTabItems[0].title,
      showCard: !!activeProcessData?.aname || activeProcessIsLoading,
      emptyMessage: false
    },
    {
      key: summaryTabItems[1].name,
      data: topProcessData,
      isLoading: topProcessIsLoading,
      title: summaryTabItems[1].title,
      showCard: !!topProcessData || topProcessIsLoading,
      emptyMessage: !!topProcessData || topProcessIsLoading
    },
    {
      key: summaryTabItems[2].name,
      data: topProcessData,
      isLoading: topProcessIsLoading,
      showCard: !!topProcessData || topProcessIsLoading,
      title: summaryTabItems[2].title,
      emptyMessage: !!topProcessData || topProcessIsLoading
    }
  ];

  const [duration, setDuration] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  useEffect(() => {
    if (activeProcessData?.end_time) {
      setIsFinished(true);
    }

    // Set initial duration based on activeProcessData
    if (activeProcessData?.start_time) {
      const initialDuration = Math.floor((Date.now() / 1000) - activeProcessData.start_time);
      setDuration(initialDuration);
    }
  }, [activeProcessData]);

  useEffect(() => {
    if (!isFinished) {
      const intervalId = setInterval(() => {
        const elapsedTime = Math.floor((Date.now() / 1000) - activeProcessData.start_time);
        setDuration(elapsedTime);
        activeProcessRefetch();
      }, 5000);

      return () => clearInterval(intervalId);
    }
  }, [isFinished, activeProcessData, activeProcessRefetch]);

  const filteredCardsData = cardsData.filter(card =>
    card.key !== summaryTabItems[0].name || card.showCard
  );

  return (
    <TabsContent value="summary" className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {filteredCardsData.map(card => {
          const tabItem = summaryTabItems.find(item => item.name === card.key);
          return tabItem ? (
            <DashboardOverviewCard
              key={card.key}
              onClick={() => handleCardClick(tabItem)}
              cardName={card.key}
              cardTitle={card.title}
              active={selectedTab.name === card.key}
              isLoading={card.isLoading}
              appName={card.data?.aname}
              pName={card.data?.pname}
              duration={tabItem.name === 'top_active_process' ? duration : card.data?.totalDuration}
              appIcon={card.showCard && topProcessData ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Google_Chrome_icon_%28February_2022%29.svg/1024px-Google_Chrome_icon_%28February_2022%29.svg.png' : null}
            />
          ) : null;
        })}
      </div>
      <SummaryTabContent
        title={selectedTab.title}
        items={processData?.items}
        offset={processData?.offset}
        total={processData?.total}
        name={selectedTab.name}
        limit={processData?.limit}
        isLoading={processIsLoading}
        processFilters={processFilters}
        setProcessFilters={setProcessFilters}
      />
    </TabsContent>
  );
};

export default SummaryTab;

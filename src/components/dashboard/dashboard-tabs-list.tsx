import React from 'react';
import {TabsList, TabsTrigger} from "@/components/ui/tabs";

const DashboardTabsLists = () => {
  return (
    <TabsList>
      <TabsTrigger value="summary">Summary</TabsTrigger>
      <TabsTrigger value="browser">Browser</TabsTrigger>
    </TabsList>
  );
};

export default DashboardTabsLists;
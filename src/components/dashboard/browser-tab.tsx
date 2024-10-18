import React from 'react';
import {TabsContent} from "@/components/ui/tabs";

const BrowserTab = () => {
  return (
    <TabsContent value="browser" className="space-y-4 text-center">
      <h2 className="text-2xl font-semibold">Coming Soon!</h2>
      <p className="text-gray-600">
        We are working hard to bring you an amazing new feature. Stay tuned for updates and be the first to try it out!
      </p>
    </TabsContent>
  );
};

export default BrowserTab;

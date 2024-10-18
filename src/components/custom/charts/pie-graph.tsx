'use client';

import * as React from 'react';
import {useEffect, useState} from 'react';
import {Label, Pie, PieChart} from 'recharts';
import {ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent} from '@/components/ui/chart';
import {ProcessResponseItem, SummaryTabEnum} from "@/services/types/process";

export interface PieGraphProps {
  items: ProcessResponseItem[];
  name: string;
}

// Function to generate a random color in hex format
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Example formatDuration function
const formatDuration = (duration: number) => {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = duration % 60;
  return `${hours}h ${minutes}m ${seconds}s`;
};

export function PieGraph(props: PieGraphProps) {
  const {items, name} = props;
  const chartTitle = (name: string, item: ProcessResponseItem) => {
    switch (name) {
      case SummaryTabEnum.TopActiveProcess:
      case SummaryTabEnum.TopAppList:
        return item.aname;
      case SummaryTabEnum.TopTitle:
        return item.title;
      default:
        return 'Pie Graph';
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

  const chartData = React.useMemo(() => {
    const data = items?.map(item => ({
      title: chartTitle(name, item),
      duration: name === 'top_active_process' ? durations[item.uuid] : item.totalDuration || 0, // Use durations if totalDuration is undefined
      fill: getRandomColor()
    })) || [];

    console.log('Chart Data:', data);

    return data;
  }, [items, name, durations]);

  const chartConfig = {
    visitors: {
      label: 'Duration',
    },
  } satisfies ChartConfig;

  const totalDuration = React.useMemo(() => {
    return chartData?.reduce((acc, curr) => acc + curr.duration, 0);
  }, [chartData]);

  return (
    <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[360px]">
      <PieChart>
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel/>}/>
        <Pie
          data={chartData}
          dataKey="duration" // Use duration for the Pie chart
          nameKey="title" // Use title for the legend
          innerRadius={60}
          strokeWidth={5}
        >
          <Label
            content={({viewBox}) => {
              if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-foreground text-lg font-bold"
                    >
                      {formatDuration(totalDuration)} {/* Format and display total duration */}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 16}
                      className="fill-muted-foreground text-sm"
                    >
                      Total Duration
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}

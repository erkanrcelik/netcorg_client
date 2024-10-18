import React from 'react';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {useSidebarToggle} from "@/hooks/use-sidebar-toggle";
import Skeleton from "@/components/custom/skeleton";
import {formatDuration} from "@/utils/time";

export interface DashboardOverviewCardProps {
  cardName: string;
  cardTitle?: string;
  appName?: string;
  appIcon?: string | null;
  pName?: string;
  duration?: number;
  title?: string;
  categoryName?: string;
  categoryIcon?: string;
  active?: boolean;
  onClick?: () => void;
  isLoading: boolean;
  emptyMessage?: string | null;
}

const DashboardOverviewCard = (props: DashboardOverviewCardProps) => {
  const {
    appName,
    isLoading,
    onClick,
    emptyMessage,
    active,
    cardTitle,
    appIcon,
    pName,
    duration,
    title,
    categoryName,
    categoryIcon
  } = props;
  const sidebar = useSidebarToggle();
  const truncateText = (text: string | undefined, maxLength: number) => {
    return text && text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  if (isLoading) {
    return (
      <Card className="cursor-pointer">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <Skeleton className="h-6 w-32"/> {/* Skeleton for card title */}
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2 items-center">
            <Skeleton className="h-6 w-6"/>
            <div className="flex flex-col space-y-1">
              <Skeleton className="h-4 w-64"/>
              <Skeleton className="h-4 w-48"/>
              <Skeleton className="h-4 w-32"/>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      onClick={onClick}
      className={`cursor-pointer ${active && 'bg-primary'}`}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className={`text-sm font-bold ${active && 'text-black'}`}>
          {cardTitle}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2 items-center">
          {appIcon && <img src={appIcon} width={25} height={20}/>}
          {categoryIcon && <img src={categoryIcon} width={25} height={20}/>}
          <div className="flex flex-col space-y-1">
            <TooltipProvider delayDuration={100}>
              {title && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span
                      className={`truncate max-w-[270px] ${sidebar.isOpen ? 'md:max-w-[350px]' : 'md:max-w-[420px]'} md:max-w-[350px] ${active && 'text-black'}`}>{truncateText(title, 50)}</span>
                  </TooltipTrigger>
                  <TooltipContent side="right" className={`${active && 'bg-white text-black'}`}>
                    <p>{title}</p>
                  </TooltipContent>
                </Tooltip>
              )}
              {appName && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span
                      className={`truncate max-w-[270px] ${sidebar.isOpen ? 'md:max-w-[350px]' : 'md:max-w-[420px]'} ${active && 'text-black'}`}>{truncateText(appName, 50)}</span>
                  </TooltipTrigger>
                  <TooltipContent side="right" className={`${active && 'bg-white text-black'}`}>
                    <p>{appName}</p>
                  </TooltipContent>
                </Tooltip>
              )}
              {pName && (
                <Tooltip delayDuration={100}>
                  <TooltipTrigger asChild>
                    <span
                      className={`truncate max-w-[270px] ${sidebar.isOpen ? 'md:max-w-[350px]' : 'md:max-w-[420px]'}  md:max-w-[350px] ${active && 'text-black'}`}>{truncateText(pName, 50)}</span>
                  </TooltipTrigger>
                  <TooltipContent side="right" className={`${active && 'bg-white text-black'}`}>
                    <p>{pName}</p>
                  </TooltipContent>
                </Tooltip>
              )}
              {categoryName && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span
                      className={`truncate max-w-[270px] ${sidebar.isOpen ? 'md:max-w-[350px]' : 'md:max-w-[420px]'}  md:max-w-[350px] ${active && 'text-black'}`}>{truncateText(categoryName, 50)}</span>
                  </TooltipTrigger>
                  <TooltipContent side="right" className={`${active && 'bg-white text-black'}`}>
                    <p>{categoryName}</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </TooltipProvider>

            {duration && <span
                className={`truncate max-w-[270px] ${sidebar.isOpen ? 'md:max-w-[350px]' : 'md:max-w-[420px]'}  md:max-w-[350px] ${active && 'text-black'}`}>{formatDuration(duration)}</span>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardOverviewCard;

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";

export interface DashboardOverviewCardProps {
  cardName: string;
  cardTitle?: string;
  appName?: string;
  appIcon?: string;
  pName?: string;
  duration?: string;
  title?: string;
  categoryName?: string;
  categoryIcon?: string;
  active?: boolean;
  onClick?: () => void;
}

const DashboardOverviewCard = (props: DashboardOverviewCardProps) => {
  const {
    appName,
    onClick,
    active,
    cardTitle,
    appIcon,
    pName,
    duration,
    title,
    categoryName,
    categoryIcon,
  } = props;
  const sidebar = useSidebarToggle();
  // Metinlerin kısaltılması için yardımcı fonksiyon
  const truncateText = (text: string | undefined, maxLength: number) => {
    return text && text.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
  };

  return (
    <Card
      onClick={onClick}
      className={`cursor-pointer ${active && "bg-primary"}`} // Dynamically apply the primary color if active
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className={`text-sm font-bold ${active && "text-black"}`}>
          {cardTitle}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2 items-center">
          {appIcon && <img src={appIcon} width={25} height={20} />}
          {categoryIcon && <img src={categoryIcon} width={25} height={20} />}
          <div className="flex flex-col space-y-1">
            <TooltipProvider delayDuration={100}>
              {title && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span
                      className={`truncate max-w-[270px] ${
                        sidebar.isOpen ? "md:max-w-[350px]" : "md:max-w-[420px]"
                      } md:max-w-[350px] ${active && "text-black"}`}
                    >
                      {truncateText(title, 50)}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent
                    side="right"
                    className={`${active && "bg-white text-black"}`}
                  >
                    <p>{title}</p>
                  </TooltipContent>
                </Tooltip>
              )}
              {appName && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span
                      className={`truncate max-w-[270px] ${
                        sidebar.isOpen ? "md:max-w-[350px]" : "md:max-w-[420px]"
                      } ${active && "text-black"}`}
                    >
                      {truncateText(appName, 50)}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent
                    side="right"
                    className={`${active && "bg-white text-black"}`}
                  >
                    <p>{appName}</p>
                  </TooltipContent>
                </Tooltip>
              )}
              {pName && (
                <Tooltip delayDuration={100}>
                  <TooltipTrigger asChild>
                    <span
                      className={`truncate max-w-[270px] ${
                        sidebar.isOpen ? "md:max-w-[350px]" : "md:max-w-[420px]"
                      }  md:max-w-[350px] ${active && "text-black"}`}
                    >
                      {truncateText(pName, 50)}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent
                    side="right"
                    className={`${active && "bg-white text-black"}`}
                  >
                    <p>{pName}</p>
                  </TooltipContent>
                </Tooltip>
              )}
              {categoryName && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span
                      className={`truncate max-w-[270px] ${
                        sidebar.isOpen ? "md:max-w-[350px]" : "md:max-w-[420px]"
                      }  md:max-w-[350px] ${active && "text-black"}`}
                    >
                      {truncateText(categoryName, 50)}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent
                    side="right"
                    className={`${active && "bg-white text-black"}`}
                  >
                    <p>{categoryName}</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </TooltipProvider>

            {duration && (
              <span
                className={`truncate max-w-[270px] ${
                  sidebar.isOpen ? "md:max-w-[350px]" : "md:max-w-[420px]"
                }  md:max-w-[350px] ${active && "text-black"}`}
              >
                {duration}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardOverviewCard;

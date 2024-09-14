import React from 'react';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";

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
  onClick?: () => void;
}

const DashboardOverviewCard = (props: DashboardOverviewCardProps) => {
  const {appName, onClick, cardTitle, appIcon, pName, duration, title, categoryName, categoryIcon} = props;

  // Metinlerin kısaltılması için yardımcı fonksiyon
  const truncateText = (text: string | undefined, maxLength: number) => {
    return text && text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  return (
    <Card onClick={onClick} className="cursor-pointer">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-bold">
          {cardTitle}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2 items-center">

          {/* Uygulama Iconu */}
          {appIcon && <img src={appIcon} width={25} height={20}/>}
          {categoryIcon && <img src={categoryIcon} width={25} height={20}/>}

          {/* İçerik Sıralaması */}
          <div className="flex flex-col space-y-1">
            {/* Her bir alanın tooltip ile truncate edilmiş versiyonu */}
            <TooltipProvider delayDuration={100}>
              {title && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span
                      className="truncate max-w-[270px] lg:max-w-[400px] md:max-w-[350px]">{truncateText(title, 50)}</span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{title}</p>
                  </TooltipContent>
                </Tooltip>
              )}
              {appName && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span
                      className="truncate max-w-[270px] lg:max-w-[400px] md:max-w-[350px]">{truncateText(appName, 50)}</span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{appName}</p>
                  </TooltipContent>
                </Tooltip>
              )}
              {pName && (
                <Tooltip delayDuration={100}>
                  <TooltipTrigger asChild>
                    <span
                      className="truncate max-w-[270px] lg:max-w-[400px] md:max-w-[350px]">{truncateText(pName, 50)}</span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{pName}</p>
                  </TooltipContent>
                </Tooltip>
              )}
              {categoryName && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span
                      className="truncate max-w-[270px] lg:max-w-[400px] md:max-w-[350px]">{truncateText(categoryName, 50)}</span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{categoryName}</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </TooltipProvider>

            {duration && <span>{duration}</span>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardOverviewCard;

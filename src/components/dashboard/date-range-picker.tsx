"use client";
import {Button} from "@/components/ui/button";
import {Calendar} from "@/components/ui/calendar";
import {Popover, PopoverContent, PopoverTrigger,} from "@/components/ui/popover";
import {useDate} from "@/hooks/use-date";
import {cn} from "@/lib/utils";
import {CalendarIcon} from "@radix-ui/react-icons";
import {format} from "date-fns";
import * as React from "react";

export function CalendarDateRangePicker({
                                     className,
                                   }: React.HTMLAttributes<HTMLDivElement>) {
  const { date, setDate: setSelectedDate } = useDate();

  const handleDateChange = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setSelectedDate(selectedDate);
    }
  };

  return (
    <>
      <div className="justify-start  md:justify-end items-center space-y-4 md:space-y-0 space-x-2 sm:flex">
        <div className={cn("grid gap-2", className)}>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "w-[260px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? (
                  format(date, "LLL dd, y")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                initialFocus
                selected={date}
                onSelect={handleDateChange}
                numberOfMonths={1}
                mode="single"
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </>

  );
}

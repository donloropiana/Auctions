"use client";

import { useState } from "react";
import { format } from "date-fns";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";

interface DateTimeFormFieldProps {
  control: any;
  name: string;
  label: string;
}

export function DateTimeFormField({
  control,
  name,
  label,
}: DateTimeFormFieldProps) {
  const [calendarOpen, setCalendarOpen] = useState(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const date = field.value ? new Date(field.value) : new Date();
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        return (
          <FormItem className="flex flex-col">
            <FormLabel>{label}</FormLabel>
            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {format(date, "PPP p")}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <div className="p-3">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(date) => {
                      if (date) {
                        const currentValue = field.value ? new Date(field.value) : new Date();
                        date.setHours(currentValue.getHours());
                        date.setMinutes(currentValue.getMinutes());
                        field.onChange(date.toISOString());
                      }
                    }}
                    initialFocus
                    disabled={{ before: today }}
                    fromDate={today}
                    captionLayout="dropdown"
                    fromYear={today.getFullYear()}
                    toYear={today.getFullYear() + 5}
                  />
                  <div className="mt-3 flex gap-2">
                    <Input
                      type="time"
                      value={date ? format(date, "HH:mm") : ""}
                      onChange={(e) => {
                        const [hours, minutes] = e.target.value.split(":");
                        const newDate = date ? new Date(date) : new Date();
                        newDate.setHours(parseInt(hours));
                        newDate.setMinutes(parseInt(minutes));
                        field.onChange(newDate.toISOString());
                      }}
                      className="w-full"
                    />
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
} 
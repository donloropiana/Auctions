"use client";

import * as React from "react";
import { format } from "date-fns"; // Install date-fns if not already in your project
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "./input";
import { Controller } from "react-hook-form";

interface CalendarInputProps {
  control: any; // Replace with your specific Control type if available
  name: string;
  placeholder?: string;
  label?: string;
}

export function CalendarInput({ control, name, placeholder = "Select date", label }: CalendarInputProps) {
  return (
    <div className="flex flex-col gap-2 text-sm font-medium">
    {label}
        <Controller
        control={control}
        name={name}
        render={({ field }) => (
            <Popover>
            <PopoverTrigger asChild>
                <Input
                readOnly
                value={field.value ? format(new Date(field.value), "yyyy-MM-dd") : ""}
                placeholder={placeholder}
                />
            </PopoverTrigger>
            <PopoverContent className="p-0">
                <Calendar
                mode="single"
                captionLayout="dropdown"
                fromYear={1900}
                toYear={new Date().getFullYear()}
                selected={field.value ? new Date(field.value) : undefined}
                onSelect={(date) => {
                    if (date) {
                    field.onChange(format(date, "yyyy-MM-dd"));
                    }
                }}
                />
            </PopoverContent>
            </Popover>
        )} 
        />
    </div>
  );
}
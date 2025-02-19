"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { CreateListingButton } from "./create-listing-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ListingsHeader() {
  return (
    <div className="bg-gray-50 border-b">
      <div className="container py-4 px-6">
        <div className="flex items-center gap-4">
          <div className="relative w-[300px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search listings..."
              className="pl-8"
            />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="wine">Wine</SelectItem>
              <SelectItem value="spirit">Spirit</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="sold">Sold</SelectItem>
              <SelectItem value="unsold">Unsold</SelectItem>
            </SelectContent>
          </Select>
          <div className="ml-auto">
            <CreateListingButton />
          </div>
        </div>
      </div>
    </div>
  );
}
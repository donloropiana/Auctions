"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import ListingForm from "./listing-form";
import { useState } from "react";
import { useRouter } from 'next/navigation';

export function CreateListingButton() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Listing
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Listing</DialogTitle>
          <DialogDescription>
            Fill out the form below to create a new auction listing.
          </DialogDescription>
        </DialogHeader>
        {open && <ListingForm onSuccess={() => {setOpen(false); router.refresh();}} />}
      </DialogContent>
    </Dialog>
  );
}

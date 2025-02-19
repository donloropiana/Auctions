"use client";

import { useQuery } from "@tanstack/react-query";
import { useSupabase } from "@/components/providers/supabase-provider";
import { getListings } from "@/lib/api/listings";
import { ListingCard } from "@/components/listings/listing-card";
import { CreateListingButton } from "@/components/listings/create-listing-button";
import { ListingsHeader } from "@/components/listings/listings-header";

export default function ListingsPage() {
  const { supabase } = useSupabase();
  const { data: listings } = useQuery({
    queryKey: ["listings"],
    queryFn: () => getListings(supabase),
  });

  return (
    <div>
      <ListingsHeader />
      <div className="container py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-6">
          {listings?.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </div>
    </div>
  );
}
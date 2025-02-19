"use client";

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSupabase } from "@/components/providers/supabase-provider";
import { getListings } from "@/lib/api/listings";
import { ListingCard } from "@/components/listings/listing-card";
import { ListingsHeader } from "@/components/listings/listings-header";

export default function ListingsPage() {
  const router = useRouter()
  const { user, profile, supabase } = useSupabase();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");

  useEffect(() => {
    if (!user) {
      router.replace('/login')
    }
  }, [user, profile, router])

  const { data: listings } = useQuery({
    queryKey: ["listings"],
    queryFn: () => getListings(supabase),
  });

  if (!user || !profile) return null

  const filteredListings = listings?.filter((listing) => {
    const matchesSearch = listing.name.toLowerCase().includes(search.toLowerCase()) ||
      listing.brand.toLowerCase().includes(search.toLowerCase()) ||
      listing.description.toLowerCase().includes(search.toLowerCase());
    
    const matchesCategory = category === "all" || listing.category === category;
    const matchesStatus = status === "all" || listing.status === status;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="h-screen flex flex-col">
      <ListingsHeader 
        onSearchChange={setSearch}
        onCategoryChange={setCategory}
        onStatusChange={setStatus}
      />
      <div className="container flex-1 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-6 py-6 h-full overflow-y-auto max-h-full">
          {filteredListings?.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </div>
    </div>
  );
}
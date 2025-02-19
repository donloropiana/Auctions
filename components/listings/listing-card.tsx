"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { formatPrice } from "@/lib/utils/price-format";
import type { Database } from "@/lib/types/database";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";

type Listing = Database["public"]["Tables"]["listings"]["Row"] & {
  files: Database["public"]["Tables"]["files"]["Row"][];
  current_price: Database["public"]["Tables"]["prices"]["Row"];
};

interface ListingCardProps {
  listing: Listing;
}

export function ListingCard({ listing }: ListingCardProps) {
  const imageUrls = listing.files.map(file => 
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/auctions_public/${file.folder_path}${file.file_name}`.replace(/\/\//g, '/')
  );

  const router = useRouter();

  return (
    <Card className="h-fit">
      <div className="relative">
        <Badge 
          className="absolute top-2 right-2 z-10"
          variant={
            listing.status === 'active' ? 'default' : 
            listing.status === 'upcoming' ? 'secondary' : 
            listing.status === 'sold' ? 'success' : 'destructive'
          }
        >
          {listing.status}
        </Badge>
        <Carousel className="w-full">
          <CarouselContent>
            {imageUrls.map((url, index) => (
              <CarouselItem key={index}>
                <div 
                  className="relative aspect-[4/3] cursor-pointer" 
                  onClick={() => router.push(`/listings/${listing.id}`)}
                >
                  <Image
                    src={url}
                    alt={`${listing.name} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {imageUrls.length > 1 && (
            <>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </>
          )}
        </Carousel>
      </div>
      <CardContent 
        className="p-4"
        onClick={() => router.push(`/listings/${listing.id}`)}
      >
        <h3 className="font-medium text-base mb-2 line-clamp-1">{listing.name}</h3>
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground text-sm capitalize">
            {listing.category}
          </span>
          <span className="font-semibold">
            {formatPrice(listing.current_price.amount)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
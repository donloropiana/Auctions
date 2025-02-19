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

  return (
    <Link href={`/listings/${listing.id}`} className="block">
      <Card>
        <CardHeader className="p-0">
          <Carousel className="w-full">
            <CarouselContent>
              {imageUrls.map((url, index) => (
                <CarouselItem key={index}>
                  <div className="relative aspect-[4/3]">
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
        </CardHeader>
        <CardContent className="p-3">
          <h3 className="font-medium text-base mb-1 line-clamp-1">{listing.name}</h3>
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
    </Link>
  );
}
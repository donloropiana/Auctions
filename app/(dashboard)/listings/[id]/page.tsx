"use client"

import { useParams } from 'next/navigation';
import { useSupabase } from '@/components/providers/supabase-provider';
import { useQuery } from '@tanstack/react-query';
import { getListing } from '@/lib/api/listings';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { formatPrice } from '@/lib/utils/price-format';
import { CartesianGrid, Line, LineChart, XAxis, YAxis, Tooltip } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { ResponsiveContainer } from 'recharts';

const chartConfig = {
  price: {
    label: "Price",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function ListingPage() {
  const { id } = useParams();
  const { supabase } = useSupabase();
  
  const { data: listing, isLoading } = useQuery({
    queryKey: ['listing', id],
    queryFn: () => getListing(supabase, parseInt(id as string))
  });

  if (isLoading) return <div>Loading...</div>;
  if (!listing) return <div>Not found</div>;
  console.log('Price history for chart:', listing.priceHistory);
  return (
    <div className="h-screen overflow-y-auto pl-6">
      <div className="container max-w-4xl py-6 space-y-8">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold mb-2">{listing.name}</h1>
            <p className="text-lg text-muted-foreground mb-2">{listing.brand}</p>
          </div>
          <Badge variant={listing.status === 'active' ? 'default' : 
                         listing.status === 'upcoming' ? 'secondary' : 
                         listing.status === 'sold' ? 'success' : 'destructive'}>
            {listing.status}
          </Badge>
        </div>

        {/* Image Carousel */}
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-0">
            <Carousel className="w-full">
              <CarouselContent>
                {listing.imageUrls.map((url, index) => (
                  <CarouselItem key={index}>
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={url}
                        alt={`${listing.name} - Image ${index + 1}`}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {listing.imageUrls.length > 1 && (
                <>
                  <CarouselPrevious className="left-2" />
                  <CarouselNext className="right-2" />
                </>
              )}
            </Carousel>
          </CardContent>
        </Card>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Details</h2>
            <dl className="space-y-2">
              <div>
                <dt className="text-sm text-muted-foreground">Category</dt>
                <dd className="capitalize">{listing.category}</dd>
              </div>
              
              {listing.category === 'wine' && (
                <>
                  <div>
                    <dt className="text-sm text-muted-foreground">Vintage</dt>
                    <dd>{listing.wine_details?.vintage}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-muted-foreground">Varietal</dt>
                    <dd>{listing.wine_details?.varietal}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-muted-foreground">Region</dt>
                    <dd>{listing.wine_details?.region}</dd>
                  </div>
                </>
              )}

              {listing.category === 'spirit' && (
                <>
                  <div>
                    <dt className="text-sm text-muted-foreground">Age</dt>
                    <dd>{listing.spirit_details?.age} years</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-muted-foreground">Proof</dt>
                    <dd>{listing.spirit_details?.proof}°</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-muted-foreground">Subcategory</dt>
                    <dd className="capitalize">{listing.spirit_details?.subcategory}</dd>
                  </div>
                </>
              )}

              <div>
                <dt className="text-sm text-muted-foreground">Volume</dt>
                <dd>{listing.volume_ml}ml</dd>
              </div>
            </dl>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Auction Info</h2>
            <dl className="space-y-2">
              <div>
                <dt className="text-sm text-muted-foreground">Start Date</dt>
                <dd>{new Date(listing.start_date_time).toLocaleString()}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">End Date</dt>
                <dd>{new Date(listing.end_date_time).toLocaleString()}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Start Price</dt>
                <dd>{formatPrice(listing.start_price.amount)}</dd>
              </div>
              {listing.reserve_price && (
                <div>
                  <dt className="text-sm text-muted-foreground">Reserve Price</dt>
                  <dd>{formatPrice(listing.reserve_price.amount)}</dd>
                </div>
              )}
              <div>
                <dt className="text-sm text-muted-foreground">Current Price</dt>
                <dd className="text-lg font-bold">{formatPrice(listing.current_price.amount)}</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Description */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Description</h2>
          <p className="whitespace-pre-wrap">{listing.description}</p>
        </div>

        {/* Price History Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Price History</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={listing.priceHistory}
                margin={{
                  top: 20,
                  right: 30,
                  left: 50,
                  bottom: 20,
                }}
              >
                <XAxis
                  dataKey="date"
                  tickFormatter={(date) => new Date(date).toLocaleDateString()}
                />
                <YAxis
                  tickFormatter={(value) => formatPrice(value)}
                />
                <Tooltip
                  formatter={(value) => formatPrice(Number(value))}
                  labelFormatter={(date) => new Date(date).toLocaleString()}
                />
                <Line
                  dataKey="amount"
                  type="stepAfter"
                  stroke="var(--color-price)"
                  strokeWidth={2}
                  dot={{ r: 6, fill: "var(--color-price)" }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

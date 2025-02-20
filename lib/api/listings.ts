import type { TypedSupabaseClient } from '@/lib/types/supabase';
import type { Database } from '@/lib/types/database';
import { z } from 'zod';
import { combinedListingSchema, listingFormSchema } from '@/lib/schemas/listing';
type Listing = Database["public"]["Tables"]["listings"]["Row"] & {
  files: Database["public"]["Tables"]["files"]["Row"][];
  current_price: Database["public"]["Tables"]["prices"]["Row"];
};

export async function getListings(supabase: TypedSupabaseClient) {
  await supabase.rpc('update_listing_statuses');
  const { data: listings, error: listingsError } = await supabase
    .from('listings')
    .select(`
      *,
      current_price:prices!listings_current_price_id_fkey(*)
    `) as { data: Listing[]; error: any };

  if (listingsError) throw listingsError;

  // Get files for each listing
  const { data: files, error: filesError } = await supabase
    .from('files')
    .select('*')
    .in('folder_path', listings.map(l => l.folder_path));

  if (filesError) throw filesError;

  // Combine the results
  return listings.map(listing => ({
    ...listing,
    files: files.filter(f => f.folder_path === listing.folder_path)
  }));
}

export async function getListing(supabase: TypedSupabaseClient, id: number) {
  await supabase.rpc('update_listing_status', { in_listing_id: id });
  const { data: listing } = await supabase
    .from('listings')
    .select(`
      *,
      current_price:prices!listings_current_price_id_fkey(*),
      start_price:prices!listings_start_price_id_fkey(*),
      reserve_price:prices!listings_reserve_price_id_fkey(*),
      wine_details:listings_wines!listings_wines_listing_id_fkey(*),
      spirit_details:listings_spirits!listings_spirits_listing_id_fkey(*)
    `)
    .eq('id', id)
    .single();

  if (!listing) return null;

  const { data: files } = await supabase.storage
    .from('auctions_public')
    .list(listing.folder_path.replace(/^\//, ''));

  const { data: bids } = await supabase
    .from('bids')
    .select(`
      created_at,
      price:prices(amount)
    `)
    .eq('listing_id', id)
    .order('created_at', { ascending: true });

  console.log('Start price:', listing.start_price);
  console.log('Bids:', bids);

  const priceHistory = [
    { amount: 0, date: new Date(listing.created_at).toISOString() },
    { amount: listing.start_price.amount, date: listing.start_date_time },
    ...(bids || []).map(bid => ({
      amount: bid.price.amount,
      date: bid.created_at
    }))
  ];

  console.log('Price history:', priceHistory);

  return {
    ...listing,
    imageUrls: (files || []).map(file => 
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/auctions_public/${listing.folder_path}${file.name}`
    ),
    priceHistory
  };
}

type ListingFormData = z.infer<typeof listingFormSchema>;

export async function submitListing(
  { values, files }: { values: ListingFormData; files: File[] }
) {
  const formData = new FormData();
  formData.append('values', JSON.stringify(values));
  
  files.forEach((file) => {
    formData.append('files', file);
  });

  const response = await fetch('/api/listing', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to create listing');
  }

  return response.json();
}

export async function submitBid(listingId: number, amount: number) {
  const response = await fetch('/api/bid', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ listingId, amount }),
  });

  if (!response.ok) {
    throw new Error('Failed to place bid');
  }

  return response.json();
}

export async function getDashboardTransactions(supabase: TypedSupabaseClient, userId: string) {
  // Get won listings: sold listings where the user is the winning bidder.
  const { data: wonListings, error: wonError } = await supabase
    .from('listings')
    .select(`
      id,
      name,
      brand,
      end_date_time,
      buyer_id,
      current_price:prices!listings_current_price_id_fkey(amount),
      reserve_price:prices!listings_reserve_price_id_fkey(amount)
    `)
    .eq('status', 'sold')
    .eq('buyer_id', userId);

  if (wonError) throw wonError;

  // Get sold listings: sold listings where the user was the seller.
  const { data: soldListings, error: soldError } = await supabase
    .from('listings')
    .select(`
      id,
      name,
      brand,
      end_date_time,
      current_price:prices!listings_current_price_id_fkey(amount),
      reserve_price:prices!listings_reserve_price_id_fkey(amount)
    `)
    .eq('status', 'sold')
    .eq('seller_id', userId);

  if (soldError) throw soldError;

  // Combine and format the results
  const transactions = [
    ...(wonListings || []).map(listing => ({
      ...listing,
      type: 'won' as const
    })),
    ...(soldListings || []).map(listing => ({
      ...listing,
      type: 'sold' as const
    }))
  ].sort((a, b) => new Date(b.end_date_time).getTime() - new Date(a.end_date_time).getTime());

  return transactions;
}
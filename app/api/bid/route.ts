import { createClient } from '@/lib/supabase/server';
import { z } from 'zod';

const bidSchema = z.object({
  listingId: z.number(),
  amount: z.number().positive(),
});

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const json = await request.json();
    const { listingId, amount } = bidSchema.parse(json);

    // 1. Create price record
    const { data: price, error: priceError } = await supabase
      .from('prices')
      .insert({ amount, currency: 'USD' })
      .select()
      .single();

    if (priceError) throw priceError;

    // 2. Create bid record
    const { error: bidError } = await supabase
      .from('bids')
      .insert({
        listing_id: listingId,
        bidder_id: user.id,
        price_id: price.id,
      });

    if (bidError) throw bidError;

    // 3. Update listing's current price
    const { data, error } = await supabase.rpc('update_listing_current_price', {
        in_listing_id: listingId,
        new_price_id: price.id,
      });

    if (error) throw error;

    return Response.json({ success: true });
  } catch (error) {
    console.error('Error placing bid:', error);
    return Response.json(
      { error: 'Failed to place bid' },
      { status: 500 }
    );
  }
}
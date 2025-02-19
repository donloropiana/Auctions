import { createClient } from '@/lib/supabase/server';
import { uploadListingImages } from '@/lib/utils/storage';
import { listingFormSchema } from '@/lib/schemas/listing';
import type { Database } from '@/lib/types/database';

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const values = JSON.parse(formData.get('values') as string);
    console.log('Received values:', values);
    
    const validatedData = listingFormSchema.parse(values);
    console.log('Validated data:', validatedData);
    
    const fileEntries = formData.getAll('files');
    const files = fileEntries as File[];
    
    // 1. Create price records
    const { data: startPrice, error: startPriceError } = await supabase
      .from('prices')
      .insert({
        amount: validatedData.start_price,
        currency: 'USD'
      })
      .select()
      .single();
  
    if (startPriceError) throw startPriceError;
  
    const { data: reservePrice, error: reservePriceError } = await supabase
      .from('prices')
      .insert({
        amount: validatedData.reserve_price || 0,
        currency: 'USD'
      })
      .select()
      .single();
  
    if (reservePriceError) throw reservePriceError;
  
    // 2. Create listing record
    const listingData: Database['public']['Tables']['listings']['Insert'] = {
      name: validatedData.name,
      brand: validatedData.brand,
      description: validatedData.description,
      category: validatedData.category,
      volume_ml: validatedData.volume_ml,
      start_date_time: new Date(validatedData.start_date_time).toISOString(),
      end_date_time: new Date(validatedData.end_date_time).toISOString(),
      start_price_id: startPrice.id,
      reserve_price_id: reservePrice.id,
      current_price_id: startPrice.id,
      seller_id: user.id,
      status: 'upcoming',
      folder_path: '',
    };
  
    const { data: listing, error: listingError } = await supabase
      .from('listings')
      .insert(listingData)
      .select()
      .single();
  
    if (listingError) throw listingError;
  
    // Update with the correct folder path
    const { error: updateError } = await supabase
      .from('listings')
      .update({ folder_path: `/listings/${listing.id}/` })
      .eq('id', listing.id);
  
    if (updateError) throw updateError;
  
    // 3. Create category-specific record
    if (validatedData.category === 'wine' && validatedData.wine_details) {
      const { error: wineError } = await supabase
        .from('listings_wines')
        .insert({
          listing_id: listing.id,
          vintage: validatedData.wine_details.vintage,
          varietal: validatedData.wine_details.varietal,
          region: validatedData.wine_details.region,
        });
  
      if (wineError) throw wineError;
    } else if (validatedData.category === 'spirit' && validatedData.spirit_details) {
      const { error: spiritError } = await supabase
        .from('listings_spirits')
        .insert({
          listing_id: listing.id,
          age: validatedData.spirit_details.age,
          proof: validatedData.spirit_details.proof,
          subcategory: validatedData.spirit_details.subcategory,
        });
  
      if (spiritError) throw spiritError;
    }
  
    // 4. Upload images and create file records
    if (files?.length > 0) {
      const uploadResults = await uploadListingImages(listing.id, user.id, files);
      
      const { error: filesError } = await supabase
        .from('files')
        .insert(uploadResults);
  
      if (filesError) throw filesError;
    }
  
    return Response.json({ success: true, listingId: listing.id });
  } catch (error) {
    console.error('Detailed error:', error);
    return Response.json(
      { error: 'Failed to create listing' }, 
      { status: 500 }
    );
  }
}
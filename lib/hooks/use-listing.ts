import { useSupabase } from "@/components/providers/supabase-provider";
import { useQuery } from "@tanstack/react-query";
import type { Database } from "@/lib/types/database";

type Listing = Database["public"]["Tables"]["listings"]["Row"] & {
  files: Database["public"]["Tables"]["files"]["Row"][];
  current_price: Database["public"]["Tables"]["prices"]["Row"];
};

export function useListings() {
  const { supabase } = useSupabase();

  return useQuery({
    queryKey: ["listings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("listings")
        .select(`
          *,
          files:files(*),
          current_price:prices!listings_current_price_id_fkey(*)
        `) as { data: Listing[]; error: any };

      if (error) throw error;
      return data;
    },
  });
}

export function useCreateListing() {
  const { supabase } = useSupabase();
  return { supabase };
}

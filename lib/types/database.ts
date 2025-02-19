export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      bids: {
        Row: {
          bidder_id: string
          created_at: string
          id: number
          listing_id: number
          price_id: number
        }
        Insert: {
          bidder_id: string
          created_at?: string
          id?: number
          listing_id: number
          price_id: number
        }
        Update: {
          bidder_id?: string
          created_at?: string
          id?: number
          listing_id?: number
          price_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "bids_bidder_id_fkey"
            columns: ["bidder_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bids_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bids_price_id_fkey"
            columns: ["price_id"]
            isOneToOne: false
            referencedRelation: "prices"
            referencedColumns: ["id"]
          },
        ]
      }
      files: {
        Row: {
          created_at: string
          file_name: string
          folder_path: string
          id: number
          user_id: string
        }
        Insert: {
          created_at?: string
          file_name: string
          folder_path: string
          id?: number
          user_id: string
        }
        Update: {
          created_at?: string
          file_name?: string
          folder_path?: string
          id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "files_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      listings: {
        Row: {
          brand: string
          buyer_id: string | null
          category: Database["public"]["Enums"]["category"]
          created_at: string
          current_price_id: number
          description: string
          end_date_time: string
          folder_path: string
          id: number
          name: string
          reserve_price_id: number | null
          seller_id: string
          start_date_time: string
          start_price_id: number
          status: Database["public"]["Enums"]["listing_status"]
          updated_at: string | null
          volume_ml: number
        }
        Insert: {
          brand: string
          buyer_id?: string | null
          category: Database["public"]["Enums"]["category"]
          created_at?: string
          current_price_id: number
          description: string
          end_date_time: string
          folder_path: string
          id?: number
          name: string
          reserve_price_id?: number | null
          seller_id: string
          start_date_time: string
          start_price_id: number
          status?: Database["public"]["Enums"]["listing_status"]
          updated_at?: string | null
          volume_ml: number
        }
        Update: {
          brand?: string
          buyer_id?: string | null
          category?: Database["public"]["Enums"]["category"]
          created_at?: string
          current_price_id?: number
          description?: string
          end_date_time?: string
          folder_path?: string
          id?: number
          name?: string
          reserve_price_id?: number | null
          seller_id?: string
          start_date_time?: string
          start_price_id?: number
          status?: Database["public"]["Enums"]["listing_status"]
          updated_at?: string | null
          volume_ml?: number
        }
        Relationships: [
          {
            foreignKeyName: "listings_buyer_id_fkey"
            columns: ["buyer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "listings_current_price_id_fkey"
            columns: ["current_price_id"]
            isOneToOne: false
            referencedRelation: "prices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "listings_reserve_price_id_fkey"
            columns: ["reserve_price_id"]
            isOneToOne: false
            referencedRelation: "prices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "listings_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "listings_start_price_id_fkey"
            columns: ["start_price_id"]
            isOneToOne: false
            referencedRelation: "prices"
            referencedColumns: ["id"]
          },
        ]
      }
      listings_spirits: {
        Row: {
          age: number
          created_at: string
          id: number
          listing_id: number
          proof: number
          subcategory: string
        }
        Insert: {
          age: number
          created_at?: string
          id?: number
          listing_id: number
          proof: number
          subcategory: string
        }
        Update: {
          age?: number
          created_at?: string
          id?: number
          listing_id?: number
          proof?: number
          subcategory?: string
        }
        Relationships: [
          {
            foreignKeyName: "listings_spirits_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: true
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
        ]
      }
      listings_wines: {
        Row: {
          created_at: string
          id: number
          listing_id: number
          region: string
          varietal: string
          vintage: number
        }
        Insert: {
          created_at?: string
          id?: number
          listing_id: number
          region: string
          varietal: string
          vintage: number
        }
        Update: {
          created_at?: string
          id?: number
          listing_id?: number
          region?: string
          varietal?: string
          vintage?: number
        }
        Relationships: [
          {
            foreignKeyName: "listings_wines_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: true
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
        ]
      }
      prices: {
        Row: {
          amount: number
          created_at: string
          currency: string
          id: number
        }
        Insert: {
          amount: number
          created_at?: string
          currency: string
          id?: number
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string
          id?: number
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_folder_path: string | null
          created_at: string
          dob: string
          email: string
          first_name: string
          id: string
          last_name: string
          username: string
        }
        Insert: {
          avatar_folder_path?: string | null
          created_at?: string
          dob: string
          email: string
          first_name: string
          id?: string
          last_name: string
          username: string
        }
        Update: {
          avatar_folder_path?: string | null
          created_at?: string
          dob?: string
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          username?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      category: "wine" | "spirit"
      listing_status: "upcoming" | "active" | "sold" | "unsold"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

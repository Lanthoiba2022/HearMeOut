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
      messages: {
        Row: {
          content: string
          created_at: string
          id: string
          room_id: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          room_id: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          room_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          full_name: string | null
          id: string
          updated_at: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          updated_at?: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      room_participants: {
        Row: {
          id: string
          is_moderator: boolean | null
          is_muted: boolean | null
          is_speaker: boolean | null
          joined_at: string
          pending_speaker_request: boolean | null
          room_id: string
          user_id: string
        }
        Insert: {
          id?: string
          is_moderator?: boolean | null
          is_muted?: boolean | null
          is_speaker?: boolean | null
          joined_at?: string
          pending_speaker_request?: boolean | null
          room_id: string
          user_id: string
        }
        Update: {
          id?: string
          is_moderator?: boolean | null
          is_muted?: boolean | null
          is_speaker?: boolean | null
          joined_at?: string
          pending_speaker_request?: boolean | null
          room_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "room_participants_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      rooms: {
        Row: {
          created_at: string
          creator_id: string
          description: string | null
          id: string
          is_active: boolean | null
          title: string
          topic: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          creator_id: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          title: string
          topic?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          creator_id?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          title?: string
          topic?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "rooms_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
    TableName extends DefaultSchemaTableNameOrOptions extends {
      schema: keyof Database
    }
      ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
          Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions  extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions  extends keyof (DefaultSchema["Tables"] &
    DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
      DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
DefaultSchemaTableNameOrOptions  extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
    TableName extends DefaultSchemaTableNameOrOptions extends {
      schema: keyof Database
    }
      ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions  extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions ["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions  extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions ] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
DefaultSchemaTableNameOrOptions  extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
    TableName extends DefaultSchemaTableNameOrOptions extends {
      schema: keyof Database
    }
      ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions  extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions ["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions  extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions ] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
DefaultSchemaEnumNameOrOptions  extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
    EnumName extends DefaultSchemaEnumNameOrOptions extends {
      schema: keyof Database
    }
      ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
    > = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
    ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
    : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
      ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

    export const Constants = {
      public: {
        Enums: {},
      },
    } as const
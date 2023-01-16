export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      lessons: {
        Row: {
          created_at: string | null;
          description: string | null;
          id: number;
          title: string | null;
        };
        Insert: {
          created_at?: string | null;
          description?: string | null;
          id?: number;
          title?: string | null;
        };
        Update: {
          created_at?: string | null;
          description?: string | null;
          id?: number;
          title?: string | null;
        };
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          full_name: string | null;
          id: string;
          updated_at: string | null;
          username: string | null;
          website: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          full_name?: string | null;
          id: string;
          updated_at?: string | null;
          username?: string | null;
          website?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          full_name?: string | null;
          id?: string;
          updated_at?: string | null;
          username?: string | null;
          website?: string | null;
        };
      };
      recipes: {
        Row: {
          carbohydrates: string | null;
          category: string | null;
          created_at: string | null;
          fats: string | null;
          id: number;
          ingredients: string[] | null;
          kCal: string | null;
          modeOfExecution: string[] | null;
          name: string | null;
          photo: string | null;
          proteins: string | null;
          video: string | null;
        };
        Insert: {
          carbohydrates?: string | null;
          category?: string | null;
          created_at?: string | null;
          fats?: string | null;
          id?: number;
          ingredients?: string[] | null;
          kCal?: string | null;
          modeOfExecution?: string[] | null;
          name?: string | null;
          photo?: string | null;
          proteins?: string | null;
          video?: string | null;
        };
        Update: {
          carbohydrates?: string | null;
          category?: string | null;
          created_at?: string | null;
          fats?: string | null;
          id?: number;
          ingredients?: string[] | null;
          kCal?: string | null;
          modeOfExecution?: string[] | null;
          name?: string | null;
          photo?: string | null;
          proteins?: string | null;
          video?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

import { Database } from "../types/supabase";

export type Poll = Database["public"]["Tables"]["Poll"]["Row"];
export type Vote = Database["public"]["Tables"]["vote"]["Row"];

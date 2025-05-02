import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"
import { createClient } from "./supabase/client";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


export async function getUserProfile(userId) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) {
    console.error('Error fetching profile:', error)
    return null
  }

  return data;
}



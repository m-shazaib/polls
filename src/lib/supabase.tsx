import AsyncStorage from '@react-native-async-storage/async-storage';
import  Constants from 'expo-constants';
import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';


const manifest = Constants.manifest || Constants.expoConfig;
const supabaseUrl = manifest.extra.SUPABASE_URL;
const supabaseAnonKey = manifest.extra.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('supabaseUrl and supabaseAnonKey are required.');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

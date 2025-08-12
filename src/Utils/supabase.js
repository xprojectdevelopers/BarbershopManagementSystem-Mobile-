import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://yufnvtnhbkowcnwntqdu.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1Zm52dG5oYmtvd2Nud250cWR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ5ODI4NDQsImV4cCI6MjA3MDU1ODg0NH0.9QesNHcZNwe9Vpl7tTXVml0Atq1jlvkwsq4lNH545fk'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})
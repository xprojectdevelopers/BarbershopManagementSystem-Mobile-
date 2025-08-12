import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xobcldnztknmthnlakqn.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhvYmNsZG56dGtubXRobmxha3FuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ3OTU2ODksImV4cCI6MjA3MDM3MTY4OX0.MISLm38EwXMuYhAJZNcYYjFr1j1UyfFgowVTWkoZDsM'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl) {
  console.warn('SUPABASE URL not set (NEXT_PUBLIC_SUPABASE_URL or SUPABASE_URL)')
}

/** @type {import('@supabase/supabase-js').SupabaseClient | null} */
let _client = null
if (supabaseUrl && supabaseServiceKey) {
  _client = createClient(supabaseUrl, supabaseServiceKey)
}

export const supabaseServer = _client

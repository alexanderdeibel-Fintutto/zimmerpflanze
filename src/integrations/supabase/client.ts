import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://aaefocdqgdgexkcrjhks.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || '';

if (!SUPABASE_PUBLISHABLE_KEY) {
  console.warn(
    '[Pflanzen-Manager] VITE_SUPABASE_PUBLISHABLE_KEY ist nicht gesetzt. ' +
    'Authentifizierung wird nicht funktionieren. ' +
    'Bitte setze die Umgebungsvariable in Vercel oder .env.local.'
  );
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});

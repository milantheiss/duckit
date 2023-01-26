import { createClient } from '@supabase/supabase-js'

export default defineNuxtPlugin(nuxtApp => {
    const config = useRuntimeConfig()
    const SUPABASE_URL = config.SUPABASE_URL
    const SUPABASE_KEY = config.SUPABASE_KEY

    console.log(SUPABASE_URL);
    console.log(SUPABASE_KEY);
    

    const client = createClient(SUPABASE_URL, SUPABASE_KEY)

    return {
        provide: {
            supabase: client
        }
    }
})
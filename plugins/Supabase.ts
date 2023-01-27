import { createClient } from '@supabase/supabase-js'
import { useRuntimeConfig } from '#imports'

export default defineNuxtPlugin(nuxtApp => {
    const config = useRuntimeConfig()
    const SUPABASE_URL = config.public.SUPABASE_URL
    const SUPABASE_KEY = config.public.SUPABASE_KEY

    const client = createClient(SUPABASE_URL, SUPABASE_KEY)

    return {
        provide: {
            supabase: client
        }
    }
})
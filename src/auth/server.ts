import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { use } from 'react'

export async function createClient() {
  const cookieStore = await cookies()

  const client = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // noop
          }
        },
      },
    }
  )
  return client;
}

export async function getUser() {
    const {auth} = await createClient();

    const userObject = auth.getUser();

    if((await userObject).error) {
        console.log((await userObject).error);
        return null;
    }

    return (await userObject).data.user;
}
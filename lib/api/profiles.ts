import type { TablesInsert, TablesUpdate } from '@/lib/types/database'

import { createClient } from '../supabase/client'
import type { TypedSupabaseClient } from '../types/supabase'

export type Profile = Awaited<ReturnType<typeof getProfile>>

export async function getProfile(
  supabase: TypedSupabaseClient,
  options?: {
    id?: string
    username?: string
  },
) {
  let query = supabase.from('profiles').select()
  if (options?.id) query = query.eq('id', options.id)
  if (options?.username) query = query.eq('username', options.username)

  const { data: profile, error } = await query.single()
  if (error) throw new Error(error.message)

  return profile
}

export async function getProfiles(supabase: TypedSupabaseClient, query: string) {
  if (!query) return []

  const { data, error } = await supabase
    .from('profiles')
    .select('id, first_name, last_name, avatar_filename, username')
    .or(
      `first_name.ilike.%${query}%, last_name.ilike.%${query}%, username.ilike.%${query}%, email.ilike.%${query}%`,
    )
  if (error) throw new Error('Error fetching profiles')

  return data
}

export async function getAllProfiles(supabase: TypedSupabaseClient) {
  const { data, error } = await supabase.from('profiles').select('*')
  if (error) throw new Error('Error fetching profiles')

  return data
}

export async function insertProfile(profile: TablesInsert<'profiles'>) {
  const supabase = createClient()
  const { data, error } = await supabase.from('profiles').insert(profile).select()

  if (error) throw new Error(error.message)
  return data
}

export async function updateProfile(id: string, newProfile: TablesUpdate<'profiles'>) {
  const supabase = createClient()
  const { data, error } = await supabase.from('profiles').update(newProfile).eq('id', id).select()

  if (error) throw new Error(error.message)
  return data
}

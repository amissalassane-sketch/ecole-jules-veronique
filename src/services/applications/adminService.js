import { supabase, isSupabaseConfigured } from '../../lib/supabase'
import { createAdminDocumentUrl } from '../documents/documentService'

function requireClient() { if (!isSupabaseConfigured) throw new Error('SUPABASE_NOT_CONFIGURED') }

export async function signInAdmin(email, password) {
  requireClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
  const { data, error: adminError } = await supabase.from('admin_users').select('user_id').limit(1)
  if (adminError || !data?.length) { await supabase.auth.signOut(); throw new Error('ADMIN_NOT_AUTHORIZED') }
}
export async function signOutAdmin() { if (supabase) await supabase.auth.signOut() }
export async function getAdminSession() {
  requireClient()
  const { data: { session }, error } = await supabase.auth.getSession()
  if (error || !session) return null
  // RLS permits this query only for the current Auth UUID. A regular authenticated
  // or anonymous applicant receives no row and cannot enter administrative routes.
  const { data: membership, error: membershipError } = await supabase
    .from('admin_users').select('user_id').eq('user_id', session.user.id).maybeSingle()
  if (membershipError || !membership) return null
  return session
}
export async function listApplications() {
  requireClient()
  const { data, error } = await supabase.from('applications').select('id,created_at,status,parent_first_name,parent_last_name,child_first_name,child_last_name,requested_program,requested_grade').order('created_at',{ascending:false})
  if (error) throw error
  return data
}
export async function getApplication(id) {
  const { data, error } = await supabase.from('applications').select('*,application_documents(*)').eq('id',id).single()
  if (error) throw error
  return data
}
export async function updateApplication(id, values) {
  const { error } = await supabase.from('applications').update(values).eq('id',id)
  if (error) throw error
}
export { createAdminDocumentUrl }

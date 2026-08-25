import { supabase, isSupabaseConfigured } from '../../lib/supabase'

const configurationError = new Error('SUPABASE_NOT_CONFIGURED')

export async function ensureApplicantSession() {
  if (!isSupabaseConfigured) throw configurationError
  const { data: { session }, error: sessionError } = await supabase.auth.getSession()
  if (sessionError) throw sessionError
  if (session) return session
  // Requires the Anonymous Sign-Ins provider to be enabled in Supabase Auth.
  const { data, error } = await supabase.auth.signInAnonymously()
  if (error) throw error
  return data.session
}

export function applicationPayload(formData, schoolYear) {
  return {
    parent_first_name: formData.parentFirstName.trim(),
    parent_last_name: formData.parentLastName.trim(),
    parent_phone: formData.parentPhone.trim(),
    parent_email: formData.parentEmail.trim(),
    parent_address: formData.parentAddress.trim() || null,
    child_first_name: formData.childFirstName.trim(),
    child_last_name: formData.childLastName.trim(),
    child_date_of_birth: formData.childDob,
    child_previous_school: formData.childPreviousSchool.trim() || null,
    requested_program: formData.selectedProgram,
    requested_grade: formData.childGrade,
    school_year: schoolYear,
  }
}

export async function createApplicationDraft(formData, schoolYear) {
  await ensureApplicantSession()
  // A security-definer database function creates the UUID and returns only the identifier.
  // The applicant cannot list/read application rows under RLS.
  const { data, error } = await supabase.rpc('create_application_draft', {
    payload: applicationPayload(formData, schoolYear),
  })
  if (error) throw error
  return data
}

export async function submitApplication(id, formData, schoolYear) {
  await ensureApplicantSession()
  const { error } = await supabase.rpc('submit_application', {
    application_id: id,
    payload: applicationPayload(formData, schoolYear),
  })
  if (error) throw error
  return id
}

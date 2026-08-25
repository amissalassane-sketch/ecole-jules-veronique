import { supabase, isSupabaseConfigured } from '../../lib/supabase'
import { ensureApplicantSession } from '../applications/applicationService'

export const MAX_DOCUMENT_SIZE = 5 * 1024 * 1024
export const ALLOWED_DOCUMENT_TYPES = {
  'application/pdf': 'pdf',
  'image/jpeg': 'jpg',
  'image/png': 'png',
}

export function validateDocument(file) {
  if (!file || file.size === 0) return 'empty'
  if (file.size > MAX_DOCUMENT_SIZE) return 'tooLarge'
  const extension = file.name.split('.').pop()?.toLowerCase()
  const expectedExtension = ALLOWED_DOCUMENT_TYPES[file.type]
  if (!expectedExtension || !['jpg', 'jpeg', expectedExtension].includes(extension)) return 'invalidType'
  return null
}

function sanitizedName(name) {
  return name.normalize('NFKD').replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 180)
}

export async function uploadApplicationDocument({ applicationId, documentType, file }) {
  if (!isSupabaseConfigured) throw new Error('SUPABASE_NOT_CONFIGURED')
  const validationError = validateDocument(file)
  if (validationError) throw new Error(`DOCUMENT_${validationError.toUpperCase()}`)
  await ensureApplicantSession()

  const extension = ALLOWED_DOCUMENT_TYPES[file.type]
  const fileId = crypto.randomUUID()
  const storagePath = `${applicationId}/${documentType}/${fileId}.${extension}`
  const { error: storageError } = await supabase.storage.from('application-documents').upload(storagePath, file, {
    contentType: file.type,
    upsert: false,
  })
  if (storageError) throw storageError

  const { error: metadataError } = await supabase.from('application_documents').insert({
    application_id: applicationId,
    document_type: documentType,
    storage_path: storagePath,
    original_filename: sanitizedName(file.name),
    mime_type: file.type,
    file_size: file.size,
  })
  if (metadataError) {
    await supabase.storage.from('application-documents').remove([storagePath])
    throw metadataError
  }
  return { storagePath, originalFilename: sanitizedName(file.name) }
}

export async function removeApplicationDocument(storagePath) {
  if (!isSupabaseConfigured) throw new Error('SUPABASE_NOT_CONFIGURED')
  await ensureApplicantSession()
  const { error: metadataError } = await supabase.from('application_documents').delete().eq('storage_path', storagePath)
  if (metadataError) throw metadataError
  const { error: storageError } = await supabase.storage.from('application-documents').remove([storagePath])
  if (storageError) throw storageError
}

export async function createAdminDocumentUrl(storagePath) {
  const { data, error } = await supabase.storage.from('application-documents').createSignedUrl(storagePath, 60)
  if (error) throw error
  return data.signedUrl
}

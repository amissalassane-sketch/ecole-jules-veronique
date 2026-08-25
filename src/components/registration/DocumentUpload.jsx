import { useRef, useState } from 'react'
import { FileText, Image, LoaderCircle, Trash2, Upload } from 'lucide-react'
import { removeApplicationDocument, uploadApplicationDocument, validateDocument } from '../../services/documents/documentService'

const TYPES = [
  { id: 'birth_certificate', icon: FileText, multiple: false },
  { id: 'student_photo', icon: Image, multiple: false },
  { id: 'previous_report_card', icon: FileText, multiple: true },
]

function formatBytes(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(bytes < 1024 * 1024 ? 2 : 1)} MB`
}

function errorMessage(code, t) {
  if (code === 'empty' || code === 'DOCUMENT_EMPTY') return t.documentEmpty
  if (code === 'tooLarge' || code === 'DOCUMENT_TOOLARGE') return t.documentTooLarge
  if (code === 'invalidType' || code === 'DOCUMENT_INVALIDTYPE') return t.documentInvalidType
  return t.documentUploadFailed
}

export default function DocumentUpload({ t, applicationId, onNeedDraft, documents, setDocuments }) {
  const [errors, setErrors] = useState({})
  const inputRefs = useRef({})

  const addFiles = async (type, selected) => {
    const files = Array.from(selected || [])
    setErrors((previous) => ({ ...previous, [type.id]: '' }))
    const invalid = files.find(validateDocument)
    if (invalid) {
      setErrors((previous) => ({ ...previous, [type.id]: errorMessage(validateDocument(invalid), t) }))
      return
    }
    try {
      const appId = applicationId || await onNeedDraft()
      const uploads = files.map((file) => ({ id: crypto.randomUUID(), file, status: 'uploading' }))
      setDocuments((previous) => ({ ...previous, [type.id]: type.multiple ? [...previous[type.id], ...uploads] : uploads }))
      for (const item of uploads) {
        const uploaded = await uploadApplicationDocument({ applicationId: appId, documentType: type.id, file: item.file })
        setDocuments((previous) => ({
          ...previous,
          [type.id]: previous[type.id].map((document) => document.id === item.id ? { ...document, status: 'uploaded', storagePath: uploaded.storagePath } : document),
        }))
      }
    } catch (error) {
      const code = error?.message
      setErrors((previous) => ({ ...previous, [type.id]: code === 'SUPABASE_NOT_CONFIGURED' ? t.documentDraftFailed : errorMessage(code, t) }))
      setDocuments((previous) => ({
        ...previous,
        [type.id]: (previous[type.id] || []).filter((document) => document.status !== 'uploading'),
      }))
    }
  }

  const remove = async (type, item) => {
    try {
      if (item.storagePath) await removeApplicationDocument(item.storagePath)
      setDocuments((previous) => ({ ...previous, [type.id]: previous[type.id].filter((document) => document.id !== item.id) }))
    } catch { setErrors((previous) => ({ ...previous, [type.id]: t.documentUploadFailed })) }
  }

  return <div className="space-y-4 sm:space-y-5">
    <div><h2 className="font-display text-xl sm:text-2xl font-bold text-neutral-900 mb-1">{t.documentTitle}</h2><p className="text-neutral-500 text-xs sm:text-sm">{t.documentSubtitle}</p></div>
    <p className="rounded-xl bg-primary-50 px-3 py-2.5 text-[11px] leading-relaxed text-primary-700">{t.documentAccepted}</p>
    {TYPES.map((type) => {
      const Icon = type.icon
      const items = documents[type.id] || []
      return <section key={type.id} className="rounded-xl border border-neutral-200 p-3.5 sm:p-4">
        <div className="mb-3 flex items-start justify-between gap-3"><div className="flex items-center gap-2 text-sm font-semibold text-neutral-800"><Icon size={17} className="text-primary-600" />{t[`document${type.id === 'birth_certificate' ? 'Birth' : type.id === 'student_photo' ? 'Photo' : 'Report'}`]}</div><span className="rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] font-medium text-neutral-500">{t.documentRequired}</span></div>
        <input ref={(node) => { inputRefs.current[type.id] = node }} className="sr-only" type="file" multiple={type.multiple} accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png" onChange={(event) => { addFiles(type, event.target.files); event.target.value = '' }} />
        <div className="space-y-2">
          {items.map((item) => <div key={item.id} className="flex min-w-0 items-center gap-2 rounded-lg bg-surface-alt px-2.5 py-2 text-xs"><FileText size={15} className="shrink-0 text-neutral-500" /><span className="min-w-0 flex-1 truncate text-neutral-700">{item.file.name} <span className="text-neutral-400">· {formatBytes(item.file.size)}</span></span>{item.status === 'uploading' ? <LoaderCircle size={15} className="shrink-0 animate-spin text-primary-600" /> : <button type="button" aria-label={t.documentRemove} onClick={() => remove(type, item)} className="touch-target shrink-0 rounded-md p-1 text-neutral-500 hover:text-red-600"><Trash2 size={15} /></button>}</div>)}
        </div>
        {errors[type.id] && <p role="alert" className="mt-2 text-xs text-red-600">{errors[type.id]}</p>}
        <button type="button" onClick={() => inputRefs.current[type.id]?.click()} className="mt-3 flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-dashed border-primary-300 px-3 text-xs font-semibold text-primary-700 hover:bg-primary-50"><Upload size={15} />{items.length ? t.documentReplace : t.documentChoose}</button>
      </section>
    })}
  </div>
}

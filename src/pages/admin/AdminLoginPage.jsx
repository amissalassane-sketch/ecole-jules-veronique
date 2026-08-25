import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { LockKeyhole } from 'lucide-react'
import { useT } from '../../hooks/useT'
import { isSupabaseConfigured } from '../../lib/supabase'
import { signInAdmin } from '../../services/applications/adminService'
import Button from '../../components/ui/Button'

export default function AdminLoginPage() {
  const t = useT().admin; const navigate = useNavigate()
  const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [error, setError] = useState(''); const [loading, setLoading] = useState(false)
  if (!isSupabaseConfigured) return <Navigate to="/" replace />
  const submit = async (event) => { event.preventDefault(); setLoading(true); setError(''); try { await signInAdmin(email,password); navigate('/admin') } catch { setError(t.signInFailed) } finally { setLoading(false) } }
  return <main className="min-h-screen bg-surface flex items-center justify-center p-5"><form onSubmit={submit} className="w-full max-w-sm rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"><LockKeyhole className="mb-4 text-primary-600" size={28}/><h1 className="font-display text-2xl font-bold text-neutral-900">{t.loginTitle}</h1><div className="mt-6 space-y-4"><label className="block text-sm font-medium">{t.email}<input required type="email" value={email} onChange={e=>setEmail(e.target.value)} className="mt-1.5 min-h-11 w-full rounded-lg border border-neutral-300 px-3" /></label><label className="block text-sm font-medium">{t.password}<input required type="password" minLength="8" value={password} onChange={e=>setPassword(e.target.value)} className="mt-1.5 min-h-11 w-full rounded-lg border border-neutral-300 px-3" /></label>{error&&<p role="alert" className="text-sm text-red-600">{error}</p>}<Button type="submit" disabled={loading} className="w-full justify-center">{loading?t.signingIn:t.signIn}</Button></div></form></main>
}

import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#FAFBFC] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-black text-primary-900 mb-4">404</h1>
        <h2 className="text-2xl font-extrabold text-primary-700 mb-4">Page introuvable</h2>
        <p className="text-primary-600 mb-8">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/" 
            className="inline-block rounded-2xl bg-accent-500 px-6 py-3 text-white font-extrabold hover:bg-accent-600 transition-colors"
          >
            Retour à l'accueil
          </Link>
          <Link
            href="/auth/connexion"
            className="inline-block rounded-2xl border border-slate-300 px-6 py-3 text-slate-700 font-semibold hover:bg-slate-50 transition-colors"
          >
            Connexion plateforme
          </Link>
        </div>
      </div>
    </main>
  )
}

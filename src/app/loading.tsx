export default function Loading() {
  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-dark-600 border-t-accent-blue rounded-full animate-spin" />
        <p className="text-light-300 text-sm">Chargement...</p>
      </div>
    </div>
  );
}

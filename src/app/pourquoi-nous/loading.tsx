export default function Loading() {
  return (
    <div className="min-h-screen bg-dark-900">
      {/* Hero skeleton */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center animate-pulse">
            <div className="h-8 w-40 bg-dark-700 rounded-full mb-6 mx-auto" />
            <div className="h-12 w-3/4 bg-dark-700 rounded-lg mb-4 mx-auto" />
            <div className="h-12 w-1/2 bg-dark-700 rounded-lg mb-6 mx-auto" />
            <div className="h-6 w-full bg-dark-700 rounded mb-2" />
            <div className="h-6 w-4/5 bg-dark-700 rounded mb-8 mx-auto" />
            <div className="flex gap-4 justify-center">
              <div className="h-12 w-40 bg-dark-700 rounded-xl" />
              <div className="h-12 w-40 bg-dark-700 rounded-xl" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

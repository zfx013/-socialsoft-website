'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to console with full stack trace
    console.error('=== GLOBAL ERROR BOUNDARY CAUGHT ===');
    console.error('Error message:', error.message);
    console.error('Error name:', error.name);
    console.error('Error stack:', error.stack);
    console.error('Error digest:', error.digest);
    console.error('Full error object:', error);
    console.error('=== END GLOBAL ERROR BOUNDARY ===');
  }, [error]);

  return (
    <html>
      <body className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-gray-800 border border-red-500 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-red-400 mb-4">
            Erreur Critique
          </h2>
          <p className="text-gray-300 mb-2">
            {error.message || 'Erreur inconnue'}
          </p>
          <pre className="text-xs text-left text-gray-500 bg-gray-900 p-4 rounded-lg overflow-auto max-h-48 mb-6">
            {error.stack}
          </pre>
          <button
            onClick={() => reset()}
            className="px-6 py-3 bg-blue-500 text-white font-medium rounded-xl hover:bg-blue-600 transition-colors"
          >
            Réessayer
          </button>
        </div>
      </body>
    </html>
  );
}

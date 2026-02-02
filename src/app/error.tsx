'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to console with full stack trace
    console.error('=== ERROR BOUNDARY CAUGHT ===');
    console.error('Error message:', error.message);
    console.error('Error name:', error.name);
    console.error('Error stack:', error.stack);
    console.error('Error digest:', error.digest);
    console.error('Full error object:', error);
    console.error('=== END ERROR BOUNDARY ===');
  }, [error]);

  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-dark-800 border border-red-500/30 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-red-400 mb-4">
          Une erreur est survenue
        </h2>
        <p className="text-light-300 mb-2">
          {error.message || 'Erreur inconnue'}
        </p>
        <p className="text-light-400 text-sm mb-6 font-mono break-all">
          {error.name}: {error.digest || 'No digest'}
        </p>
        <pre className="text-xs text-left text-light-500 bg-dark-900 p-4 rounded-lg overflow-auto max-h-48 mb-6">
          {error.stack}
        </pre>
        <button
          onClick={() => reset()}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium rounded-xl hover:opacity-90 transition-opacity"
        >
          Réessayer
        </button>
      </div>
    </div>
  );
}

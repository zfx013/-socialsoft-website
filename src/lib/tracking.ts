// Types d'événements trackés
export type TrackingEvent =
  | 'page_visit'
  | 'about_click'
  | 'contact_click'
  | 'pole_infrastructure'
  | 'pole_developpement'
  | 'pole_formation'
  | 'linkedin_click'
  | 'address_click'
  | 'email_click'
  | 'phone_click'
  | 'contact_form_submit';

// Fonction pour tracker un événement
export function trackEvent(event: TrackingEvent): void {
  // Fire and forget - ne bloque pas l'UI
  fetch('/api/track', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ event }),
  }).catch(() => {
    // Silently fail
  });
}

// Hook pour tracker les clics facilement
export function createClickHandler(
  event: TrackingEvent,
  originalHandler?: () => void
): () => void {
  return () => {
    trackEvent(event);
    if (originalHandler) {
      originalHandler();
    }
  };
}

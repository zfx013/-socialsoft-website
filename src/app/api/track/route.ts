import { NextRequest, NextResponse } from 'next/server';

const APPSCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzPsqYbWGjfWrrx46kOkOQmfJkbOHFzlreLhNi99axCRnHu924OBlCETTkIBdx3EcdE/exec';

// Événements autorisés (sécurité)
const ALLOWED_EVENTS = [
  'page_visit',
  'about_click',
  'contact_click',
  'pole_infrastructure',
  'pole_developpement',
  'pole_formation',
  'linkedin_click',
  'address_click',
  'email_click',
  'phone_click',
  'contact_form_submit',
];

export async function POST(request: NextRequest) {
  try {
    const { event } = await request.json();

    // Validation
    if (!event || !ALLOWED_EVENTS.includes(event)) {
      return NextResponse.json(
        { error: 'Invalid event' },
        { status: 400 }
      );
    }

    // Envoi à AppScript (fire and forget pour ne pas bloquer l'UI)
    fetch(APPSCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ event }),
    }).catch(() => {
      // Silently fail - analytics shouldn't break the site
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Track API error:', error);
    return NextResponse.json(
      { error: 'Tracking failed' },
      { status: 500 }
    );
  }
}

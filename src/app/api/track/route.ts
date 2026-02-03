import { NextRequest, NextResponse } from 'next/server';
import { rateLimit, getClientIP } from '@/lib/rate-limit';

const APPSCRIPT_URL = process.env.APPSCRIPT_TRACKING_URL;

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
] as const;

// Rate limit: 30 tracking events per minute per IP (more lenient for analytics)
const RATE_LIMIT_CONFIG = {
  limit: 30,
  windowMs: 60 * 1000,
};

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIP = getClientIP(request);
    const rateLimitResult = rateLimit(`track:${clientIP}`, RATE_LIMIT_CONFIG);

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { status: 429 }
      );
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON' },
        { status: 400 }
      );
    }

    const { event } = body;

    // Validation: check event is string and in allowed list
    if (
      typeof event !== 'string' ||
      !ALLOWED_EVENTS.includes(event as typeof ALLOWED_EVENTS[number])
    ) {
      return NextResponse.json(
        { error: 'Invalid event' },
        { status: 400 }
      );
    }

    // Envoi à AppScript (fire and forget pour ne pas bloquer l'UI)
    if (APPSCRIPT_URL) {
      fetch(APPSCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ event }),
      }).catch(() => {
        // Silently fail - analytics shouldn't break the site
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Track API error:', error);
    return NextResponse.json(
      { error: 'Tracking failed' },
      { status: 500 }
    );
  }
}

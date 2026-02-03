import { NextRequest, NextResponse } from 'next/server';
import xss from 'xss';
import { rateLimit, getClientIP } from '@/lib/rate-limit';

const APPSCRIPT_URL = process.env.APPSCRIPT_CONTACT_URL;

// Input length limits
const LIMITS = {
  name: 100,
  email: 254,
  phone: 30,
  subject: 200,
  message: 5000,
};

// Rate limit: 5 requests per minute per IP
const RATE_LIMIT_CONFIG = {
  limit: 5,
  windowMs: 60 * 1000,
};

// Sanitize and validate input
function sanitizeInput(value: unknown, maxLength: number): string {
  if (typeof value !== 'string') return '';
  return xss(value.trim().slice(0, maxLength));
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= LIMITS.email;
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIP = getClientIP(request);
    const rateLimitResult = rateLimit(`contact:${clientIP}`, RATE_LIMIT_CONFIG);

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Trop de requêtes. Veuillez réessayer plus tard.' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': rateLimitResult.resetTime.toString(),
          },
        }
      );
    }

    if (!APPSCRIPT_URL) {
      console.error('APPSCRIPT_CONTACT_URL is not configured');
      return NextResponse.json(
        { error: 'Configuration serveur manquante' },
        { status: 500 }
      );
    }

    // Parse and validate request body
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Format de données invalide' },
        { status: 400 }
      );
    }

    // Sanitize all inputs
    const name = sanitizeInput(body.name, LIMITS.name);
    const email = sanitizeInput(body.email, LIMITS.email);
    const phone = sanitizeInput(body.phone, LIMITS.phone);
    const subject = sanitizeInput(body.subject, LIMITS.subject);
    const message = sanitizeInput(body.message, LIMITS.message);

    // Validation
    if (!name || name.length < 2) {
      return NextResponse.json(
        { error: 'Le nom doit contenir au moins 2 caractères' },
        { status: 400 }
      );
    }

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Adresse email invalide' },
        { status: 400 }
      );
    }

    if (!subject || subject.length < 3) {
      return NextResponse.json(
        { error: 'Le sujet doit contenir au moins 3 caractères' },
        { status: 400 }
      );
    }

    if (!message || message.length < 10) {
      return NextResponse.json(
        { error: 'Le message doit contenir au moins 10 caractères' },
        { status: 400 }
      );
    }

    // Envoi à AppScript
    await fetch(APPSCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: JSON.stringify({
        name,
        email,
        phone: phone || 'Non renseigné',
        subject,
        message,
      }),
    });

    return NextResponse.json(
      { success: true },
      {
        headers: {
          'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
        },
      }
    );
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi du message' },
      { status: 500 }
    );
  }
}

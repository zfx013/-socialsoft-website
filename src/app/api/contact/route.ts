import { NextRequest, NextResponse } from 'next/server';

const APPSCRIPT_URL = process.env.APPSCRIPT_CONTACT_URL;

export async function POST(request: NextRequest) {
  try {
    if (!APPSCRIPT_URL) {
      console.error('APPSCRIPT_CONTACT_URL is not configured');
      return NextResponse.json(
        { error: 'Configuration serveur manquante' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Veuillez remplir tous les champs obligatoires' },
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

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi du message' },
      { status: 500 }
    );
  }
}

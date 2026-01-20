import { NextRequest, NextResponse } from 'next/server';

const WEB3FORMS_KEY = '14594310-a3dc-4be5-a952-c249760aa2ca';

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, subject, message } = await request.json();

    // Validation basique
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Veuillez remplir tous les champs obligatoires' },
        { status: 400 }
      );
    }

    // Envoi via Web3Forms
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject: `[Contact Site Web] ${subject}`,
        from_name: 'SocialSoft Website',
        name,
        email,
        phone: phone || 'Non renseigné',
        message,
      }),
    });

    const data = await response.json();

    if (!data.success) {
      console.error('Web3Forms error:', data);
      return NextResponse.json(
        { error: 'Erreur lors de l\'envoi du message' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const WEB3FORMS_KEY = process.env.WEB3FORMS_KEY;

    if (!WEB3FORMS_KEY) {
      return NextResponse.json(
        { error: 'Erreur config: WEB3FORMS_KEY manquante' },
        { status: 500 }
      );
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Erreur: données du formulaire invalides' },
        { status: 400 }
      );
    }

    const { name, email, phone, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Veuillez remplir tous les champs obligatoires' },
        { status: 400 }
      );
    }

    let web3Response;
    try {
      web3Response = await fetch('https://api.web3forms.com/submit', {
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
    } catch (fetchError) {
      return NextResponse.json(
        { error: 'Erreur réseau: impossible de contacter Web3Forms' },
        { status: 500 }
      );
    }

    let data;
    try {
      const responseText = await web3Response.text();

      if (!web3Response.ok) {
        return NextResponse.json(
          { error: `Erreur Web3Forms (${web3Response.status}): ${responseText.substring(0, 100)}` },
          { status: 500 }
        );
      }

      data = JSON.parse(responseText);
    } catch (parseError) {
      return NextResponse.json(
        { error: `Erreur parsing Web3Forms: ${parseError instanceof Error ? parseError.message : 'JSON invalide'}` },
        { status: 500 }
      );
    }

    if (!data.success) {
      return NextResponse.json(
        { error: `Erreur Web3Forms: ${data.message || 'envoi échoué'}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
    return NextResponse.json(
      { error: `Erreur serveur: ${errorMessage}` },
      { status: 500 }
    );
  }
}

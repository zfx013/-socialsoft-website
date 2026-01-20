import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not configured');
    return NextResponse.json(
      { error: 'Service email non configuré' },
      { status: 500 }
    );
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { name, email, phone, subject, message } = await request.json();

    // Validation basique
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Veuillez remplir tous les champs obligatoires' },
        { status: 400 }
      );
    }

    // Envoi de l'email
    const { data, error } = await resend.emails.send({
      from: 'SocialSoft Website <onboarding@resend.dev>', // Changera après vérification du domaine
      to: ['luis-pinto.seca@outlook.fr'], // TODO: Changer pour contact@socialsoft.fr après vérification du domaine
      replyTo: email,
      subject: `[Contact Site Web] ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); padding: 30px; border-radius: 10px 10px 0 0;">
            <h1 style="color: #3b82f6; margin: 0; font-size: 24px;">Nouveau message de contact</h1>
          </div>

          <div style="background: #f8fafc; padding: 30px; border: 1px solid #e2e8f0;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; width: 120px;">
                  <strong>Nom</strong>
                </td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b;">
                  ${name}
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">
                  <strong>Email</strong>
                </td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b;">
                  <a href="mailto:${email}" style="color: #3b82f6;">${email}</a>
                </td>
              </tr>
              ${phone ? `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">
                  <strong>Téléphone</strong>
                </td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b;">
                  <a href="tel:${phone}" style="color: #3b82f6;">${phone}</a>
                </td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">
                  <strong>Sujet</strong>
                </td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b;">
                  ${subject}
                </td>
              </tr>
            </table>

            <div style="margin-top: 20px;">
              <strong style="color: #64748b;">Message :</strong>
              <div style="background: white; padding: 15px; border-radius: 8px; margin-top: 10px; border: 1px solid #e2e8f0; color: #1e293b; white-space: pre-wrap;">
${message}
              </div>
            </div>
          </div>

          <div style="background: #1e293b; padding: 20px; border-radius: 0 0 10px 10px; text-align: center;">
            <p style="color: #94a3b8; margin: 0; font-size: 12px;">
              Ce message a été envoyé depuis le formulaire de contact du site socialsoft.fr
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Erreur lors de l\'envoi du message' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue' },
      { status: 500 }
    );
  }
}

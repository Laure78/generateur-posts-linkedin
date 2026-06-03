/**
 * Notification fin de traitement IA (email optionnel si RESEND_API_KEY + BEWORK_NOTIFY_EMAIL).
 */
export async function notifyMissionReady(params: {
  missionId: string;
  title: string;
  ownerEmail: string;
}): Promise<void> {
  const notifyTo = process.env.BEWORK_NOTIFY_EMAIL?.trim();
  const apiKey = process.env.RESEND_API_KEY?.trim();

  console.info('[BeWork] Mission prête à valider:', params.missionId, params.title, '→', params.ownerEmail);

  if (!apiKey || !notifyTo) return;

  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.BEWORK_EMAIL_FROM ?? 'BeWork <noreply@bework.fr>',
        to: [notifyTo],
        subject: `[BeWork] À valider — ${params.title}`,
        text: `Une demande est en attente de validation chef d'équipe.\n\nTitre : ${params.title}\nID : ${params.missionId}\nAssistant : ${params.ownerEmail}\n\nPlateforme Admin : ${process.env.NEXT_PUBLIC_APP_URL ?? 'https://app.laureolivie.fr'}/plateforme/admin`,
      }),
    });
  } catch (err) {
    console.error('[BeWork] notification email:', err);
  }
}

import { NextResponse } from 'next/server';
import { getAppProfile } from '@/lib/auth/profile';
import { canAccessAdminPlatform } from '@/lib/bework/roles';
import {
  fetchPendingValidationQueue,
  VALIDATION_REMINDER_DAYS,
} from '@/lib/missions/pending-validation';

export async function POST(request: Request) {
  const profile = await getAppProfile();
  if (!profile) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  }
  if (!canAccessAdminPlatform(profile.role)) {
    return NextResponse.json({ error: 'Accès refusé' }, { status: 403 });
  }

  const pending = await fetchPendingValidationQueue(profile.id, profile.role);
  const overdue = pending.filter((m) => m.isOverdue);

  if (overdue.length === 0) {
    return NextResponse.json({
      message: `Aucune demande en attente depuis plus de ${VALIDATION_REMINDER_DAYS} jours.`,
      overdueCount: 0,
    });
  }

  const summary = overdue
    .map((m) => `• ${m.title} (${m.daysPending} j) — ${m.type}`)
    .join('\n');

  const resendKey = process.env.RESEND_API_KEY;
  const notifyEmail = process.env.BEWORK_NOTIFY_EMAIL;

  if (resendKey && notifyEmail) {
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: process.env.BEWORK_EMAIL_FROM ?? 'BeWork <noreply@bework.fr>',
          to: [notifyEmail],
          subject: `[BeWork] ${overdue.length} livrable(s) à valider (> ${VALIDATION_REMINDER_DAYS} j)`,
          text: `Bonjour,\n\n${overdue.length} demande(s) attendent une validation chef d'équipe depuis plus de ${VALIDATION_REMINDER_DAYS} jours :\n\n${summary}\n\nConnectez-vous à la plateforme admin BeWork.`,
        }),
      });
      return NextResponse.json({
        message: `Email de rappel envoyé à ${notifyEmail} (${overdue.length} demande(s)).`,
        overdueCount: overdue.length,
        emailed: true,
      });
    } catch (err) {
      console.error('Resend remind-pending:', err);
    }
  }

  console.info('[BeWork] Rappel validation chef — demandes en retard:\n', summary);

  return NextResponse.json({
    message: `${overdue.length} demande(s) en retard listée(s) dans les logs serveur. Configurez RESEND_API_KEY et BEWORK_NOTIFY_EMAIL pour l'email.`,
    overdueCount: overdue.length,
    emailed: false,
  });
}

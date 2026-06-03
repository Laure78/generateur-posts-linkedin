import { notFound } from 'next/navigation';
import { getAppProfile } from '@/lib/auth/profile';
import { fetchMissionById } from '@/lib/missions/access';
import { MissionDetailContent } from '@/components/platform/MissionDetailContent';
import { missionDeliverableExists } from '@/lib/skills/mission-output';
import { resolveMissionOptions } from '@/lib/bework/mission-meta';

export default async function AdminDemandeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const profile = await getAppProfile();
  if (!profile) return null;

  const mission = await fetchMissionById(id, profile.id, profile.role);
  if (!mission) notFound();

  const options = resolveMissionOptions({
    brief: mission.brief,
    output_format: mission.output_format,
    use_skill_charter: mission.use_skill_charter,
  });
  const hasDeliverable = await missionDeliverableExists(id, options.output_format);

  return (
    <MissionDetailContent
      mission={mission}
      hasDeliverable={hasDeliverable}
      viewerRole={profile.role}
      viewerId={profile.id}
      backHref="/plateforme/admin"
      backLabel="Administration"
      adminMode
    />
  );
}

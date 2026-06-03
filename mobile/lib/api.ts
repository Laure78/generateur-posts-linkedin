const API_URL = (process.env.EXPO_PUBLIC_API_URL ?? 'https://app.laureolivie.fr').replace(/\/$/, '');

export type Mission = {
  id: string;
  user_id: string;
  type: string;
  skill_id: string;
  title: string;
  brief: string;
  chantier: string | null;
  status: string;
  ai_result: string | null;
  chef_validated_at?: string | null;
  created_at?: string;
};

export type AppProfile = {
  id: string;
  email: string;
  role: 'client' | 'beworker' | 'chef_equipe' | 'admin';
  company_name?: string | null;
};

async function apiFetch<T>(
  path: string,
  token: string,
  init?: RequestInit
): Promise<{ data?: T; error?: string; status: number }> {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      ...init,
      headers: {
        Authorization: `Bearer ${token}`,
        ...(init?.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
        ...init?.headers,
      },
    });
    const json = (await res.json().catch(() => ({}))) as T & { error?: string };
    if (!res.ok) {
      return { error: (json as { error?: string }).error ?? res.statusText, status: res.status };
    }
    return { data: json as T, status: res.status };
  } catch (e) {
    return { error: e instanceof Error ? e.message : 'Erreur réseau', status: 0 };
  }
}

export async function fetchProfile(token: string) {
  return apiFetch<{ profile: AppProfile }>('/api/profile', token);
}

export async function fetchMissions(token: string, params?: { status?: string; q?: string }) {
  const qs = new URLSearchParams();
  if (params?.status) qs.set('status', params.status);
  if (params?.q) qs.set('q', params.q);
  qs.set('limit', '40');
  const query = qs.toString() ? `?${qs}` : '';
  return apiFetch<{ missions: Mission[]; profile: AppProfile }>(`/api/missions${query}`, token);
}

export async function fetchMission(token: string, id: string) {
  return apiFetch<{ mission: Mission }>(`/api/missions/${id}`, token);
}

export async function createDemande(
  token: string,
  body: {
    type: string;
    title: string;
    brief: string;
    chantier?: string;
  }
) {
  return apiFetch<{ id: string; processing?: boolean }>('/api/demandes', token, {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

export async function runSkill(token: string, missionId: string) {
  return apiFetch<{ result?: string; processing?: boolean }>('/api/skills/run', token, {
    method: 'POST',
    body: JSON.stringify({ missionId }),
  });
}

export async function validateMission(token: string, missionId: string, note?: string) {
  return apiFetch<{ mission: Mission }>(`/api/missions/${missionId}/validate`, token, {
    method: 'POST',
    body: JSON.stringify({ note }),
  });
}

export async function uploadFileText(token: string, file: { uri: string; name: string; mimeType?: string }) {
  const form = new FormData();
  form.append('file', {
    uri: file.uri,
    name: file.name,
    type: file.mimeType ?? 'application/octet-stream',
  } as unknown as Blob);

  return apiFetch<{ text: string }>('/api/extract-file-text', token, {
    method: 'POST',
    body: form,
  });
}

export function documentDownloadUrl(missionId: string, format = 'docx') {
  return `${API_URL}/api/missions/${missionId}/document?format=${format}`;
}

export { API_URL };

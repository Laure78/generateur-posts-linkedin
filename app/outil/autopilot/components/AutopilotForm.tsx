'use client';

export type AutopilotProfile = {
  sector: string;
  targetClient: string;
  goal: string;
};

export type AutopilotPreferences = {
  frequency: string;
  style: string;
  topics: string[];
};

const SECTORS = ['BTP', 'Automobile', 'Consultant', 'Marketing', 'Autre'];
const TARGET_CLIENTS = [
  { value: 'artisans', label: 'Artisans' },
  { value: 'dirigeants_pme', label: 'Dirigeants PME' },
  { value: 'rh', label: 'RH' },
  { value: 'fondateurs', label: 'Fondateurs' },
  { value: 'recruteurs', label: 'Recruteurs' },
];
const GOALS = [
  { value: 'find_clients', label: 'Trouver des clients' },
  { value: 'grow_audience', label: 'Agrandir mon audience' },
  { value: 'become_expert', label: 'Devenir expert reconnu' },
  { value: 'recruit_talent', label: 'Recruter des talents' },
];
const FREQUENCIES = [
  { value: '2', label: '2 posts / semaine' },
  { value: '3', label: '3 posts / semaine' },
  { value: '5', label: '5 posts / semaine' },
];
const STYLES = [
  { value: 'storytelling', label: 'Storytelling' },
  { value: 'educational', label: 'Éducatif' },
  { value: 'opinion', label: 'Opinion' },
  { value: 'viral', label: 'Viral' },
];
const TOPICS = [
  'IA',
  'Productivité',
  'Business',
  'Outils',
  'Histoire personnelle',
  'Erreurs',
  'Études de cas',
];

type AutopilotFormProps = {
  step: 1 | 2;
  profile: AutopilotProfile;
  preferences: AutopilotPreferences;
  onProfileChange: (p: Partial<AutopilotProfile>) => void;
  onPreferencesChange: (p: Partial<AutopilotPreferences>) => void;
};

export function AutopilotForm({
  step,
  profile,
  preferences,
  onProfileChange,
  onPreferencesChange,
}: AutopilotFormProps) {
  const toggleTopic = (t: string) => {
    const next = preferences.topics.includes(t)
      ? preferences.topics.filter((x) => x !== t)
      : [...preferences.topics, t];
    onPreferencesChange({ topics: next });
  };

  return (
    <div className="space-y-8">
      {/* Step 1: Profile */}
      {step === 1 && (
      <div>
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-500">
          1. Ton profil
        </h3>
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-700">
              Secteur
            </label>
            <select
              value={profile.sector}
              onChange={(e) => onProfileChange({ sector: e.target.value })}
              className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-neutral-800 focus:border-[#377CF3] focus:outline-none focus:ring-2 focus:ring-[#377CF3]/20"
            >
              {SECTORS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-700">
              Cible client
            </label>
            <select
              value={profile.targetClient}
              onChange={(e) => onProfileChange({ targetClient: e.target.value })}
              className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-neutral-800 focus:border-[#377CF3] focus:outline-none focus:ring-2 focus:ring-[#377CF3]/20"
            >
              {TARGET_CLIENTS.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-700">
              Objectif LinkedIn
            </label>
            <div className="flex flex-wrap gap-2">
              {GOALS.map((g) => (
                <button
                  key={g.value}
                  type="button"
                  onClick={() => onProfileChange({ goal: g.value })}
                  className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
                    profile.goal === g.value
                      ? 'bg-[#377CF3] text-white'
                      : 'border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50'
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      )}

      {/* Step 2: Preferences */}
      {step === 2 && (
      <div>
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-500">
          2. Préférences de contenu
        </h3>
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-700">
              Fréquence de publication
            </label>
            <div className="flex flex-wrap gap-2">
              {FREQUENCIES.map((f) => (
                <button
                  key={f.value}
                  type="button"
                  onClick={() => onPreferencesChange({ frequency: f.value })}
                  className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
                    preferences.frequency === f.value
                      ? 'bg-[#377CF3] text-white'
                      : 'border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-700">
              Style de contenu
            </label>
            <div className="flex flex-wrap gap-2">
              {STYLES.map((s) => (
                <button
                  key={s.value}
                  type="button"
                  onClick={() => onPreferencesChange({ style: s.value })}
                  className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
                    preferences.style === s.value
                      ? 'bg-[#377CF3] text-white'
                      : 'border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-700">
              Thèmes (sélection multiple)
            </label>
            <div className="flex flex-wrap gap-2">
              {TOPICS.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => toggleTopic(t)}
                  className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
                    preferences.topics.includes(t)
                      ? 'bg-[#377CF3] text-white'
                      : 'border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
  );
}

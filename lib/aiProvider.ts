/**
 * Fournisseur IA unifié — OpenAI (GPT), Anthropic (Claude), OpenRouter
 * OpenRouter : DeepSeek, Claude Haiku, Mistral
 */

export type AIProvider = 'openai' | 'claude' | 'openrouter';

export const OPENROUTER_MODELS = [
  { id: 'deepseek/deepseek-chat-v3.1', label: 'DeepSeek V3.1', cost: 'économique' },
  { id: 'anthropic/claude-haiku-4.5', label: 'Claude Haiku 4.5', cost: 'rapide' },
  { id: 'mistralai/mistral-large', label: 'Mistral Large', cost: 'qualité' },
] as const;

export type OpenRouterModelId = (typeof OPENROUTER_MODELS)[number]['id'];

export interface GenerateOptions {
  systemPrompt: string;
  userPrompt: string;
  provider?: AIProvider;
  /** Modèle OpenRouter (requis si provider === 'openrouter') */
  openRouterModel?: string;
  maxTokens?: number;
  temperature?: number;
}

/**
 * Appelle l'API appropriée selon le provider
 */
export async function generateWithAI(options: GenerateOptions): Promise<string> {
  const {
    systemPrompt,
    userPrompt,
    provider = 'openai',
    openRouterModel,
    maxTokens = 1000,
    temperature = 0.7,
  } = options;

  if (provider === 'claude') {
    return generateWithClaude({ systemPrompt, userPrompt, maxTokens, temperature });
  }
  if (provider === 'openrouter') {
    return generateWithOpenRouter({
      systemPrompt,
      userPrompt,
      model: openRouterModel || OPENROUTER_MODELS[0].id,
      maxTokens,
      temperature,
    });
  }
  return generateWithOpenAI({ systemPrompt, userPrompt, maxTokens, temperature });
}

async function generateWithOpenAI(params: {
  systemPrompt: string;
  userPrompt: string;
  maxTokens: number;
  temperature: number;
}): Promise<string> {
  const apiKey = (process.env.OPENAI_API_KEY || '').trim();
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY non configurée dans .env.local');
  }

  const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: params.systemPrompt },
        { role: 'user', content: params.userPrompt },
      ],
      temperature: params.temperature,
      max_tokens: params.maxTokens,
    }),
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    const message = (errData as { error?: { message?: string } })?.error?.message || response.statusText;
    throw new Error(`API OpenAI : ${message}`);
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const content = data.choices?.[0]?.message?.content?.trim();
  if (!content) {
    throw new Error("Réponse vide de l'API OpenAI");
  }
  return content;
}

async function generateWithClaude(params: {
  systemPrompt: string;
  userPrompt: string;
  maxTokens: number;
  temperature: number;
}): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY non configurée. Ajoute-la dans .env.local');
  }

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: params.maxTokens,
      system: params.systemPrompt,
      messages: [{ role: 'user', content: params.userPrompt }],
      temperature: params.temperature,
    }),
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    const message = (errData as { error?: { message?: string } })?.error?.message || response.statusText;
    throw new Error(`API Claude : ${message}`);
  }

  const data = (await response.json()) as {
    content?: Array<{ type: string; text?: string }>;
  };
  const textBlock = data.content?.find((c) => c.type === 'text');
  const content = textBlock?.text?.trim();
  if (!content) {
    throw new Error("Réponse vide de l'API Claude");
  }
  return content;
}

async function generateWithOpenRouter(params: {
  systemPrompt: string;
  userPrompt: string;
  model: string;
  maxTokens: number;
  temperature: number;
}): Promise<string> {
  const apiKey = (process.env.OPENROUTER_API_KEY || '').trim();
  if (!apiKey) {
    throw new Error('OPENROUTER_API_KEY non configurée dans .env.local');
  }

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
      'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'https://laureolivie.fr',
    },
    body: JSON.stringify({
      model: params.model,
      messages: [
        { role: 'system', content: params.systemPrompt },
        { role: 'user', content: params.userPrompt },
      ],
      temperature: params.temperature,
      max_tokens: params.maxTokens,
    }),
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    const message = (errData as { error?: { message?: string } })?.error?.message || response.statusText;
    throw new Error(`API OpenRouter : ${message}`);
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const content = data.choices?.[0]?.message?.content?.trim();
  if (!content) {
    throw new Error("Réponse vide de l'API OpenRouter");
  }
  return content;
}

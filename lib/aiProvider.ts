/**
 * Fournisseur IA unifié — OpenAI (GPT) et Anthropic (Claude)
 * Permet de basculer entre les deux APIs selon la configuration
 */

export type AIProvider = 'openai' | 'claude';

export interface GenerateOptions {
  systemPrompt: string;
  userPrompt: string;
  provider?: AIProvider;
  maxTokens?: number;
  temperature?: number;
}

/**
 * Appelle l'API OpenAI ou Anthropic selon le provider
 */
export async function generateWithAI(options: GenerateOptions): Promise<string> {
  const {
    systemPrompt,
    userPrompt,
    provider = 'openai',
    maxTokens = 1000,
    temperature = 0.7,
  } = options;

  if (provider === 'claude') {
    return generateWithClaude({ systemPrompt, userPrompt, maxTokens, temperature });
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

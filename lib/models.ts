const MODELS_DEV_LOGO_BASE = "https://models.dev/logos";

const PROVIDER_RULES: { match: RegExp; provider: string }[] = [
  { match: /^(gpt|codex|o[134]|chatgpt|dall)/u, provider: "openai" },
  { match: /^claude/u, provider: "anthropic" },
  { match: /^(gemini|gemma|palm)/u, provider: "google" },
  { match: /^deepseek/u, provider: "deepseek" },
  { match: /^(qwen|qwq)/u, provider: "alibaba" },
  { match: /^(kimi|moonshot)/u, provider: "moonshotai" },
  { match: /^minimax/u, provider: "minimax" },
  { match: /^mimo/u, provider: "xiaomi" },
  { match: /^(hy|hunyuan)/u, provider: "tencent" },
  { match: /^nemotron/u, provider: "nvidia" },
  { match: /^llama/u, provider: "llama" },
  { match: /^grok/u, provider: "xai" },
  {
    match: /^(mistral|codestral|magistral|ministral|pixtral|devstral)/u,
    provider: "mistral",
  },
  { match: /^glm/u, provider: "zhipuai" },
  { match: /^command/u, provider: "cohere" },
];

const UNKNOWN_PROVIDER = "unknown";

const AGENT_PROVIDERS: Record<string, string> = {
  amp: UNKNOWN_PROVIDER,
  claude: "anthropic",
  codex: "openai",
  opencode: "opencode",
};

const resolveModelProvider = (model: string): string => {
  const normalized = model.trim().toLowerCase();
  const rule = PROVIDER_RULES.find((entry) => entry.match.test(normalized));
  return rule?.provider ?? UNKNOWN_PROVIDER;
};

const providerLogoUrl = (provider: string): string =>
  `${MODELS_DEV_LOGO_BASE}/${provider}.svg`;

export const getModelLogoUrl = (model: string): string =>
  providerLogoUrl(resolveModelProvider(model));

export const getAgentLogoUrl = (agent: string): string =>
  providerLogoUrl(
    AGENT_PROVIDERS[agent.trim().toLowerCase()] ?? UNKNOWN_PROVIDER
  );

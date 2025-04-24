export const SUPPORTED_CHAIN_IDS = [
  1,
  10,
  137,
  8453,
] as const;

export type SupportedChainId = typeof SUPPORTED_CHAIN_IDS[number];

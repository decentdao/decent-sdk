import {
  mainnet,
  sepolia,
  base,
  optimism,
  polygon,
} from 'viem/chains';

export const SUPPORTED_CHAIN_IDS = [
  mainnet.id,
  sepolia.id,
  base.id,
  optimism.id,
  polygon.id,
] as const;

export type SupportedChainId = typeof SUPPORTED_CHAIN_IDS[number];

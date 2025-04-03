import { Address } from 'viem';

export type Safe = {
  owners: Address[];
  threshold: number;
};

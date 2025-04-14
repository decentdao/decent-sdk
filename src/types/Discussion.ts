import { Address } from 'viem';

export type Comment = {
  id: string;
  replyToId: string;
  proposalSlug: string;
  authorAddress: Address;
  content: string;
  createdAt: number;
  updatedAt: number;
}

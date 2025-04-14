import { Address } from 'viem';
import { Optional } from './Common';

export type Comment = {
  id: string;
  replyToId: Optional<string>;
  proposalSlug: string;
  authorAddress: Address;
  content: string;
  createdAt: number;
  updatedAt: Optional<number>;
}

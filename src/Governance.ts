export enum TokenType {
  ERC20 = "ERC20",
  ERC721 = "ERC721",
  ERC1155 = "ERC1155",
}

export type TokenWeight = {
  type: TokenType;
  address?: string;
  weightPerToken: number; // default to 1. DAO creation can set up different ratio
};

export type ProposalPermission = {
  threshold: number; // voting weight
  whitelist?: string[]; // Hats token IDs
};

export type VotingStrategy = {
  address: string; // string enum
  tokenWeight: TokenWeight[];
  votingWeight?: string; // calculation contract address, f(x) = 1 * x right now
  proposalPermissions: ProposalPermission;
};

export type GovernanceSettings = {
  quorum: number; // in percentage
  votingPeriod: number;
  timelockPeriod: number;
  executionPeriod: number; // in second
};

export type Governance = {
  address: string; // module address
  settings: GovernanceSettings;
  strategies: VotingStrategy[];
};

export type Fractal = {
  address?: string;
  constrollers?: string[];
  // contains owners, normally just the parent DAO
};

export type FreezeVoting = {
  address: string;
  frozen: boolean;
};

export type Guard = {
  address: string;
  freezeVoting?: FreezeVoting;
  settings: GovernanceSettings; // look into this
};

import { Address } from "viem";
import { Optional } from "./Common";
import { TokenType } from "./Token";

export type TokenWeight = {
  type: TokenType;
  address: Optional<Address>;
  weightPerToken: number; // default to 1. DAO creation can set up different ratio
};

export type ProposalPermission = {
  threshold: number; // voting weight
  whitelist: Optional<Address[]>; // Hats token IDs
};

export type VotingStrategy = {
  address: string; // string
  masterAddress: string;
  version: Optional<number>;
  tokenWeight: TokenWeight[];
  votingWeightCalculatorAddress?: Optional<Address>; // calculation contract address, f(x) = 1 * x right now
  proposalPermissions: ProposalPermission;
};

export type GovernanceSettings = {
  quorum: number; // in percentage
  votingPeriod: number;
  timelockPeriod: number;
  executionPeriod: number; // in second
};

export type Governance = {
  address: Address; // module address
  settings: GovernanceSettings;
  strategies: VotingStrategy[];
};

export type Fractal = {
  address?: Optional<Address>;
  constrollers?: Optional<Address[]>; // list of controller addresses
  // contains owners, normally just the parent DAO
};

export type FreezeVoting = {
  address: Address;
  frozen: boolean;
};

export type Guard = {
  address: Address;
  freezeVoting?: Optional<FreezeVoting>;
  settings: GovernanceSettings; // look into this
};

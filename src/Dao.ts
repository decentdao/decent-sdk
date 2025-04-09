import { Address } from "viem";
import { Fractal, GovernanceModule, Guard } from "./Governance";
import { Optional } from "./Common";
import { Safe } from "./Safe";

export type GasTank = {
  address: Optional<Address>;
  enabled: boolean; // if enabled, address should hold a value
};

export interface IGovernanceCycle {
  firstStart: Date; // first ever cycle. Voting starts on cycle start
  days: number; // Days
}

export type Dao = {
  chainId: number;
  address: Address;
  safe: Optional<Safe>;
  name: Optional<string>;
  cid: string; // for ipfs proposal templates
  governace: Optional<GovernanceModule[]>; // null if Multi-sig
  guard: Optional<Guard>; // for subDAO, Freeze, parent DAO vote on FreezeVoting
  fractal: Optional<Fractal>; // for subDAO only, parent DAO can force child DAO to make a transaction
  parent: Optional<Address>;
  children: Optional<Address[]>;
  gastank: Optional<GasTank>;
  snapshotENS: Optional<string>;
  proposalTemplateHash: Optional<string>;
  cycle: Optional<IGovernanceCycle>;
};

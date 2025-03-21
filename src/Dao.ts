import { Address } from "viem";
import { Fractal, Governance, Guard } from "./Governance";
import { Optional } from "./Common";

export type GasTank = {
  address: Optional<Address>;
  enabled: boolean;
};

export type Dao = {
  chainId: number;
  address: Address;
  name: Optional<string>;
  cid: string; // for ipfs proposal templates
  governace?: Governance[]; // null if Multi-sig
  guard: Optional<Guard>; // for subDAO, Freeze, parent DAO vote on FreezeVoting
  fractal: Optional<Fractal>; // for subDAO only, parent DAO can force child DAO to make a transaction
  parent: Optional<Address>;
  children: Optional<Dao[]>;
  gastank: Optional<GasTank>;
  snapshotENS: Optional<string>;
  proposalTemplateHas: Optional<string>;
};

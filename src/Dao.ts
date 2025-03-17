import { Fractal, Governance, Guard } from "./Governance";

export type Dao = {
  chainId: number;
  address: string;
  name?: string;
  cid: string; // for ipfs proposal templates
  governace?: Governance[]; // null if Multi-sig
  guard?: Guard; // for subDAO, Freeze, parent DAO vote on FreezeVoting
  fractal?: Fractal; // for subDAO only, parent DAO can force child DAO to make a transaction
  subDAOs?: Dao[];
};

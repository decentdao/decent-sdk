import { Address } from "viem";
import { Optional } from "./Common";

export type GnosisSafe = {
  address: Address;
  owners: Address[];
  nonce: number;
  nextNonce: number;
  threshold: number;
  modulesAddresses: Address[];
  guard: Optional<Address>;
};

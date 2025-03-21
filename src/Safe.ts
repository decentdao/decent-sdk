import { Address } from "viem";
import { Optional } from "./Common";

export type Safe = {
  owners: Address[];
  threshold: number;
  modulesAddresses: Address[];
  guard: Optional<Address>;
};

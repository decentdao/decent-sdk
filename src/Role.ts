import { Address } from "viem";
import { PaymentStream } from "./PaymentStream";
import { Optional } from "./Common";

export type Role = {
  cid: string; // cid to metadata with data (title and/or description and/or others)
  address: Address;
  canPropose: boolean; // derived from voting strategy proposal permission whitelist
  term: Optional<Date>;
  payment: Optional<PaymentStream[]>;
};

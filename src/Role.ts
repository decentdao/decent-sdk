import { Address } from "viem";
import { PaymentStream } from "./PaymentStream";

export type Role = {
  cid: string; // cid to metadata with data (title and/or description and/or others)
  address: Address;
  canPropose: boolean; // derived from voting strategy proposal permission whitelist
  term?: Date;
  payment?: PaymentStream;
};

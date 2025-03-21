import { Address } from "viem";
import { Optional } from "./Common";
import { IVote } from "./Vote";

export interface IProposalAction {
  address: Address;
}

export type TransferAction = IProposalAction & {
  amount: number; // Transfering ETH
};

export type ContractActionParam = {
  name: string;
  type: string;
  value: string; // to be converted to the right type according to ABI
};

export type ContractAction = IProposalAction & {
  name: string; // function name
  abi: unknown; // ABI object for the contract
  params?: ContractActionParam[];
};

export interface IProposal {
  proposer: Address; // address of the proposer
  title: Optional<string>; // title and description are from DB if proposal is in draft.
  description: Optional<string>;
  cid: Optional<string>; // cid to metadata with data (title and/or description and/or others)
  votingStrategy: Address;
  startDatetime: Optional<Date>;
  endDatetime: Optional<Date>;
  proposalId: Optional<number>; // BigInt?
  votes: Optional<IVote[]>; // vote records
}

export type ProposalTransaction = {
  actions: Optional<IProposalAction[]>;
};

export type YesNoProposal = IProposal & {
  tx: ProposalTransaction;
};

export type ProposalChoice = {
  tx: ProposalTransaction;
};

export type MultipleChoiceProposal = IProposal & {
  choices: ProposalChoice[];
};

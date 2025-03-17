import { IVote } from "./Vote";

export interface IProposalAction {
  address: string;
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
  title?: string; // title and description are from DB if proposal is in draft.
  description?: string;
  cid?: string; // cid to metadata with data (title and/or description and/or others)
  proposalId?: number; // BigInt?
  votes?: IVote[]; // vote records
}

export type ProposalTransaction = {
  actions?: IProposalAction[];
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

import { Address } from "viem";
import { Optional } from "./Common";
import { IVote } from "./Vote";
import { IGovernanceCycle } from "./Dao";

export interface IProposalAction {
  address: Address;
}

export type TransferAction = IProposalAction & {
  amount: number; // Transfering native tokens
};

export type ContractActionParam = {
  name: string; // for example: amount
  type: string; // for example: unit256
  value: string; // to be converted to the right type according to ABI
};

export type ContractAction = IProposalAction & {
  name: string; // function name
  abi: unknown; // ABI object for the contract
  params: Optional<ContractActionParam[]>;
};

/*
cid stored JSON
{
  "title": "...",
  "description": "...",
  "choices": [
    "John Smith",
    "Mike Dan"
  ]
}
*/

export interface IProposal {
  id: Optional<string>; // id in the DB
  proposer: Address; // address of the proposer
  title: Optional<string>; // title and description are from DB if proposal is in draft.
  description: Optional<string>;
  cid: Optional<string>; // cid to metadata with data (title and/or description and/or others)
  votingStrategy: Optional<Address>;
  voteStartsAt: Optional<Date>; // if onchain, voteStartsAt and voteEndsAt should have value
  voteEndsAt: Optional<Date>;
  proposalId: Optional<number>; // if onchain, there should be a proposal
  discussionId: number; // if went through discussion, there should be discussion ID
  version: number; // Starts at 1
  totalVoteWeight: number; // assuming it comes from snapshot
  votes: Optional<IVote[]>; // vote records
  cycle: Optional<number>; // Use votingStrategy to get DAO, and get DAO's governance cycle.
}

export type ProposalTransaction = {
  actions: Optional<IProposalAction[]>;
};

export interface YesNoVoteResult {
  yes: number;
  no: number;
  abstain: number;
}

export type YesNoProposal = IProposal & {
  thumbsUp: number; // from Web2
  thumbsDown: number;
  thumbsUpWeighted: number;
  thumbsDownWeighted: number;
  tx: ProposalTransaction;
  result: Optional<YesNoVoteResult>;
};

/*
Sample multiple choice proposal
We want to pay Decent
1. $100,  // tx: transfer 100 USDC
2. $2000,  // TX: transfer 2000 USDC
3. $800,000  // TX: transfer 800000 USDC

Elect council members
1. John Smith // address
2. Mike Dam // address
*/

export type ProposalChoice = {
  text: string;
  tx: ProposalTransaction;
};

export interface MultipleChoiceVoteResult {
  totalWeightVoted: number;
  choice: number[]; // the votingWeight for each choice
}

export type MultipleChoiceProposal = IProposal & {
  choices: ProposalChoice[];
  result: MultipleChoiceVoteResult;
};

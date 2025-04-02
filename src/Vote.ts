export interface IVote {
  address: string;
  weight: number;
  time?: Date; // We can get the vote time from onchain. Not sure if there is use for it
}

export enum Vote {
  Yes = "YES",
  No = "NO",
  Abstain = "ABSTAIN",
}

export type YesNoVote = IVote & {
  vote: Vote;
};

export type MultipleChoiceVote = IVote & {
  vote: number; // In case we support MC vote, the result is the index
};

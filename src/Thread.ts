export interface IComment {
  id: string;
  text: string;
  createAt: Date;
}

export type Thread = IComment & {
  proposalId: string; // web2 id
  version: number;
};

export type Comment = IComment & {
  threadId: string; // top thread Id, could be the same as parentId
  parentId: string; // parent comment ID
};

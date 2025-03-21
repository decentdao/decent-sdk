import { Optional } from "./Common";

export enum TokenType {
  ERC20 = "ERC20",
  ERC721 = "ERC721",
  ERC1155 = "ERC1155",
}

export interface IToken {
  address: string;
  name: string;
  symbol: string;
  type: TokenType;
  totalSupply: bigint;
  logoUrl: Optional<string>;
  thumbnailUrl: Optional<string>;
  decimals: number;
  verifiedContract: boolean;
  nativeToken: boolean;
  usePrice: Optional<number>;
}

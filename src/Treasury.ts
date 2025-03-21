export type TokenBlance = {
  tokenAddress: string;
  balance: number;
  balanceFormatted: string;
  usdValue: number;
  portfolioPercentage: number;
};

export type Treasury = {
  totalUsdValue: number;
  fungible: TokenBlance[];
  nonFungible: TokenBlance[];
};

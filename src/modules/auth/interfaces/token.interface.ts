export interface IToken {
  id: string;
  userId: string;
  refreshToken: string;
  createdAt: number;
  updatedAt: number;
}

export interface ITokens {
  refreshToken: string;
  accessToken: string;
}

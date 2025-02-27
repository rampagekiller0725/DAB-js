/* eslint-disable @typescript-eslint/class-name-casing */
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable camelcase */
import { Principal } from '@dfinity/principal';

export type AccountIdentifier = string;

export type TokenIdentifier = string;

export type Balance = bigint;

export type SubAccount = number[];

export type Memo = number[];

export type Fee = bigint;

export type Time = bigint;

export type TokenIndex = number;

export type Tokens = TokenIndex[];

export type User =
  | {
      addres?: AccountIdentifier; // No notification
    }
  | {
      principal?: Principal; // default to sub account 0
    };

export type CommonError =
  | {
      InvalidToken: TokenIdentifier;
    }
  | {
      Other: string;
    };

export interface ResultOk<T> {
  ok: T;
}

export interface ResultError<T> {
  error: T;
}

export type Result<Ok, Error> = ResultOk<Ok> | ResultError<Error>;

interface BalanceRequest {
  token: TokenIdentifier;
  user: User;
}

export interface Listing {
  locked?: Time;
  seller: Principal;
  price: bigint;
}

export interface TokenMetaData {
  name: string;
  decimals: number;
  symbol: string;
}

export type Extension = string;

type Details = [AccountIdentifier, Listing];

type BalanceResult = Result<Balance, CommonError>;

type DetailsResult = Result<Details, CommonError>;

type TokensResult = Result<Tokens, CommonError>;

type TokenExt = [TokenIndex, Listing[], Int8Array[]];

type TokensExtResult = Result<TokenExt[], CommonError>;

type SupplyResponse = Result<Balance, CommonError>;


interface TransferRequest {
  to: User;
  from: User;
  token: TokenIdentifier;
  amount: Balance;
  memo: Memo;
  notify: boolean;
  subaccount?: SubAccount;
}

type TransferError =
  | { Unauthorized: AccountIdentifier }
  | { InsufficientBalance: null }
  | { Rejected: null }
  | { InvalidToken: TokenIdentifier }
  | { CannotNotify: AccountIdentifier }
  | { Other: string };

type TransferResult = Result<Balance, TransferError>;

export interface FungibleMetadata {
  fungible: TokenMetaData & {
    metadata?: Int8Array[];
  };
}

export interface NonFungibleMetadata {
  nonfungible: {
    metadata: Int8Array[];
  };
}
export type Metadata = FungibleMetadata | NonFungibleMetadata;

export type MetadataResponse = Result<Metadata, CommonError>;

export default interface _SERVICE {
  extensions: () => Promise<Extension[]>;
  balance: (arg_0: BalanceRequest) => Promise<BalanceResult>;
  details: (token: TokenIdentifier) => Promise<DetailsResult>;
  tokens: (account: AccountIdentifier) => Promise<TokensResult>;
  tokens_ext: (account: AccountIdentifier) => Promise<TokensExtResult>;
  transfer: (arg_0: TransferRequest) => Promise<TransferResult>;
  metadata: (token: TokenIdentifier) => Promise<MetadataResponse>;
  supply: (token: TokenIdentifier) => Promise<SupplyResponse>;
}
export const init = () => {
  return [];
};

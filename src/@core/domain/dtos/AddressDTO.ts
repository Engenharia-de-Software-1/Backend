export interface IAddressInput {
  city: string;
  state: string;
  userId: string;
}

export interface IAddressOutput {
  id: string;
  city: string;
  state: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

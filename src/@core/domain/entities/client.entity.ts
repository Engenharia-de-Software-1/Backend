import { createUUID } from '../utils/createUUID';

export type IClientProps = {
  id?: string;
  companyName?: string;
  cnpj?: string;
  profession: string;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export class Client {
  public readonly id: string;
  public companyName: IClientProps['companyName'];
  public cnpj: IClientProps['cnpj'];
  public userId: Required<IClientProps['userId']>;
  public profession: Required<IClientProps['profession']>;
  public readonly createdAt: IClientProps['createdAt'];
  public readonly updatedAt: IClientProps['updatedAt'];

  private constructor(props: IClientProps, id?: string) {
    this.id = id || createUUID();

    if (!props) {
      this.companyName = null;
      this.cnpj = null;
      this.userId = null;
      this.profession = null;
      this.createdAt = null;
      this.updatedAt = null;
      return;
    }

    this.companyName = props.companyName || '';
    this.cnpj = props.cnpj || '';
    this.userId = props.userId;
    this.profession = props.profession;
    this.createdAt = props.createdAt || new Date();
    this.updatedAt = props.updatedAt || new Date();
  }

  static create(props: IClientProps, id?: string): Client {
    return new Client(props, id);
  }
}

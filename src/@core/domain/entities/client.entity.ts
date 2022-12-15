import { IClientOutput } from '../dtos/ClientDTO';
import { createUUID } from '../utils/createUUID';
import { validCNPJ } from '../utils/formsValidation';

export type IClientProps = {
  id?: string;
  companyName?: string;
  cnpj?: string;
  profession: string;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
  views?: number;
};

export class Client {
  public readonly id: string;
  public companyName: IClientProps['companyName'];
  public cnpj: IClientProps['cnpj'];
  public userId: Required<IClientProps['userId']>;
  public profession: Required<IClientProps['profession']>;
  public readonly createdAt: IClientProps['createdAt'];
  public updatedAt: IClientProps['updatedAt'];
  public views: IClientProps['views'];

  private constructor(props: IClientProps, id?: string) {
    this.id = id || createUUID();

    if (!props) {
      this.companyName = null;
      this.cnpj = null;
      this.userId = null;
      this.profession = null;
      this.createdAt = null;
      this.updatedAt = null;
      this.views = null;
      return;
    }

    this.companyName = props.companyName || '';
    this.cnpj = props.cnpj || '';
    this.userId = props.userId;
    this.profession = props.profession;
    this.createdAt = props.createdAt || new Date();
    this.updatedAt = props.updatedAt || new Date();
    this.views = props.views || 0;
  }

  static create(props: IClientProps, id?: string): Client {
    return new Client(props, id);
  }

  public updateCompanyName(companyName: string): void {
    this.companyName = companyName;
  }

  public updateCnpj(cnpj: string): void {
    this.cnpj = cnpj;
  }

  public updateProfession(profession: string): void {
    this.profession = profession;
  }

  public updateViews(): void {
    this.views += 1;
  }

  public validateCNPJ(): void {
    if (!validCNPJ(this.cnpj)) {
      throw new Error('Invalid CNPJ');
    }
  }

  public toJson(): IClientOutput {
    return {
      id: this.id,
      companyName: this.companyName,
      cnpj: this.cnpj,
      profession: this.profession,
      userId: this.userId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      views: this.views,
    };
  }
}

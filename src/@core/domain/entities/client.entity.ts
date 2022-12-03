import { IClientOutput } from '../dtos/ClientDTO';
import { createUUID } from '../utils/createUUID';

export type IClientProps = {
  id?: string;
  companyName?: string;
  cnpj?: string;
  profession: string;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
  viewsOnProfile?: number;
};

export class Client {
  public readonly id: string;
  public companyName: IClientProps['companyName'];
  public cnpj: IClientProps['cnpj'];
  public userId: Required<IClientProps['userId']>;
  public profession: Required<IClientProps['profession']>;
  public readonly createdAt: IClientProps['createdAt'];
  public updatedAt: IClientProps['updatedAt'];
  public viewsOnProfile: IClientProps['viewsOnProfile'];

  private constructor(props: IClientProps, id?: string) {
    this.id = id || createUUID();

    if (!props) {
      this.companyName = null;
      this.cnpj = null;
      this.userId = null;
      this.profession = null;
      this.createdAt = null;
      this.updatedAt = null;
      this.viewsOnProfile = null;
      return;
    }

    this.companyName = props.companyName || '';
    this.cnpj = props.cnpj || '';
    this.userId = props.userId;
    this.profession = props.profession;
    this.createdAt = props.createdAt || new Date();
    this.updatedAt = props.updatedAt || new Date();
    this.viewsOnProfile = props.viewsOnProfile || 0;
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

  public updateViewsOnProfile(): void {
    this.viewsOnProfile += 1;
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
      viewsOnProfile: this.viewsOnProfile,
    };
  }
}

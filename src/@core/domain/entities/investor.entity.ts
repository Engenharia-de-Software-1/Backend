import { IInvestorOutput } from '../dtos/InvestorDTO';
import { createUUID } from '../utils/createUUID';

export type IInvestorProps = {
  id?: string;
  companyName?: string;
  cnpj?: string;
  qtdMembers?: number;
  profession: string;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
  viewsOnProfile?: number;
};

export class Investor {
  public readonly id: string;
  public companyName: IInvestorProps['companyName'];
  public cnpj: IInvestorProps['cnpj'];
  public qtdMembers: IInvestorProps['qtdMembers'];
  public userId: Required<IInvestorProps['userId']>;
  public profession: Required<IInvestorProps['profession']>;
  public readonly createdAt: IInvestorProps['createdAt'];
  public updatedAt: IInvestorProps['updatedAt'];
  public viewsOnProfile: IInvestorProps['viewsOnProfile'];

  private constructor(props: IInvestorProps, id?: string) {
    this.id = id || createUUID();

    if (!props) {
      this.companyName = null;
      this.cnpj = null;
      this.userId = null;
      this.profession = null;
      this.qtdMembers = null;
      this.createdAt = null;
      this.updatedAt = null;
      this.viewsOnProfile = null;
      return;
    }

    this.companyName = props.companyName || '';
    this.cnpj = props.cnpj || '';
    this.userId = props.userId;
    this.profession = props.profession;
    this.qtdMembers = props.qtdMembers || 0;
    this.createdAt = props.createdAt || new Date();
    this.updatedAt = props.updatedAt || new Date();
    this.viewsOnProfile = props.viewsOnProfile || 0;
  }

  static create(props: IInvestorProps, id?: string): Investor {
    return new Investor(props, id);
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

  public updateQtdMembers(qtdMembers: number): void {
    this.qtdMembers = qtdMembers;
  }

  public updateViewsOnProfile(): void {
    this.viewsOnProfile += 1;
  }

  public toJson(): IInvestorOutput {
    return {
      id: this.id,
      companyName: this.companyName,
      cnpj: this.cnpj,
      profession: this.profession,
      qtdMembers: this.qtdMembers,
      userId: this.userId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      viewsOnProfile: this.viewsOnProfile,
    };
  }
}

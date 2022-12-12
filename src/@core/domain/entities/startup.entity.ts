import { IStartupOutput } from '../dtos/StartupDTO';
import { createUUID } from '../utils/createUUID';
import { validCNPJ } from '../utils/formsValidation';

export type IStartupProps = {
  id?: string;
  startupName?: string;
  cnpj?: string;
  employees?: number;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
  views?: number;
};

export class Startup {
  public readonly id: string;
  public startupName: IStartupProps['startupName'];
  public cnpj: IStartupProps['cnpj'];
  public userId: Required<IStartupProps['userId']>;
  public employees: Required<IStartupProps['employees']>;
  public readonly createdAt: IStartupProps['createdAt'];
  public updatedAt: IStartupProps['updatedAt'];
  public views: IStartupProps['views'];

  private constructor(props: IStartupProps, id?: string) {
    this.id = id || createUUID();

    if (!props) {
      this.startupName = null;
      this.cnpj = null;
      this.userId = null;
      this.employees = 0;
      this.createdAt = null;
      this.updatedAt = null;
      this.views = null;
      return;
    }

    this.startupName = props.startupName || '';
    this.cnpj = props.cnpj || '';
    this.userId = props.userId;
    this.employees = props.employees || 0;
    this.createdAt = props.createdAt || new Date();
    this.updatedAt = props.updatedAt || new Date();
    this.views = props.views || 0;
  }

  static create(props: IStartupProps, id?: string): Startup {
    return new Startup(props, id);
  }

  public updateStartupName(startupName: string): void {
    this.startupName = startupName;
  }

  public updateCnpj(cnpj: string): void {
    this.cnpj = cnpj;
  }

  public updateEmployees(employees: number): void {
    this.employees = employees;
  }

  public updateViews(): void {
    this.views += 1;
  }

  public validateCNPJ(): void {
    if (!validCNPJ(this.cnpj)) {
      throw new Error('Invalid CNPJ');
    }
  }

  public toJson(): IStartupOutput {
    return {
      id: this.id,
      startupName: this.startupName,
      cnpj: this.cnpj,
      employees: this.employees,
      userId: this.userId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      views: this.views,
    };
  }
}

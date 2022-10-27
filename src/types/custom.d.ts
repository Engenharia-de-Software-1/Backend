import { IUserOutputRelations } from './../@core/domain/dtos/UserDTO';
declare namespace Express {
  export interface Request {
    user?: IUserOutputRelations
  }
}
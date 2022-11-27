import { Controller, Get, UnauthorizedException } from "@nestjs/common";
import { GetAllUsersUseCase } from "src/@core/application/getAllUsersUsecase";
import { Admin } from "src/@core/domain/decorators/admin.decorator";
import { IUserOutput } from "src/@core/domain/dtos/UserDTO";

@Controller('user')
export class UserController {
  constructor(
    private getAllUsersUseCase: GetAllUsersUseCase
  ) {}
    
  @Get()
  async getAllUsers(@Admin() admin: any): Promise<IUserOutput[]> {
    if (!admin) throw new UnauthorizedException('Not an admin');
    const users = await this.getAllUsersUseCase.execute();
    return users;
  }
}
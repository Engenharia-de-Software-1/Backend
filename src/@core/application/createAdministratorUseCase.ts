import {
  IAdministratorInput,
  IAdministratorOutput,
} from '../domain/dtos/AdministratorDTO';
import { Administrator } from '../domain/entities/administrator.entity';

export class CreateAdministratorUseCase {
  async execute(input: IAdministratorInput): Promise<IAdministratorOutput> {
    const admin = Administrator.create(input);
    admin.validateEmail();
    admin.validatePassword();
    admin.validateIfPasswordMatch(input.confirmPassword);

    // TODO: Verify if email already exists
    // TODO: Encrypt password

    const output = admin.toJson();
    // TODO: save admin in database
    // TODO: delete password from output
    return output;
  }
}

import { ILoginInput, ILoginOutput } from './../domain/dtos/LoginDTO';
import { IHashRepository } from './../domain/repositories/IHashRepository';
import { IUserRepository } from './../domain/repositories/IUserRepository';
import { IJwtRepository } from '../domain/repositories/Auth/IJwtRepository';
import { IAdminRepository } from '../domain/repositories/IAdminRepository';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: '.env.local' });

export class LoginUseCase {
  constructor(
    private jwtTokenService: IJwtRepository,
    private userRepository: IUserRepository,
    private hashRepository: IHashRepository,
    private adminRepository: IAdminRepository
  ) {}

  async execute(input: ILoginInput): Promise<ILoginOutput> {
    const { email, password } = input;

    const user = await this.userRepository.findByEmail(email, true);
    const admin = await this.adminRepository.findByEmail(email, true);
    if (!user && !admin) {
      throw new Error('Cant find user or password is wrong');
    }

    const userFinded = user ? user : admin;

    const match = await this.hashRepository.compareHash(
      password,
      userFinded.password,
    );
    if (!match) {
      throw new Error('Cant find user or password is wrong');
    }

    const payload = { userId: userFinded.id };
    const secret = process.env.JWT_SECRET;
    const expiresIn = process.env.JWT_EXPIRARTION_TIME + 's';
    const token = this.jwtTokenService.createToken(payload, secret, expiresIn);
    return { token };
  }
}

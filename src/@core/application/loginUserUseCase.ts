import { ILoginInput, ILoginOutput } from './../domain/dtos/LoginDTO';
import { IHashRepository } from './../domain/repositories/IHashRepository';
import { IUserRepository } from './../domain/repositories/IUserRepository';
import { IJwtRepository } from '../domain/repositories/Auth/IJwtRepository';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: '.env.local' });

export class LoginUseCase {
  constructor(
    private jwtTokenService: IJwtRepository,
    private userRepository: IUserRepository,
    private hashRepository: IHashRepository,
  ) {}

  async execute(input: ILoginInput): Promise<ILoginOutput> {
    const { email, password } = input;

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Cant find user or password is wrong');
    }

    const match = await this.hashRepository.compareHash(
      password,
      user.password,
    );
    if (!match) {
      throw new Error('Cant find user or password is wrong');
    }

    const payload = { userId: user.id };
    const secret = process.env.JWT_SECRET;
    const expiresIn = process.env.JWT_EXPIRARTION_TIME + 's';
    const token = this.jwtTokenService.createToken(payload, secret, expiresIn);
    return { token };
  }
}

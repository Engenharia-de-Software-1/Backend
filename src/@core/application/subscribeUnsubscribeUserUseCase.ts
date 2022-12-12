import { IPlansRepository } from './../domain/repositories/IPlansRepository';
import { IUpdateUserSubscriptionInput } from './../domain/dtos/PlansDTO';
import { IUserOutputRelations } from '../domain/dtos/UserDTO';
import { IUserRepository } from '../domain/repositories/IUserRepository';
import { HttpException } from '@nestjs/common';
import { User } from '../domain/entities/user.entity';

export class SubscribeUnsubscribeUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private plansRepository: IPlansRepository,
  ) {}

  public async execute(
    userId: string,
    data: IUpdateUserSubscriptionInput,
  ): Promise<IUserOutputRelations> {
    const { plan } = data;
    const user = await this.userRepository.findByIdWithRelations(userId);
    if (!user) throw new HttpException('User not found', 400);

    const forUpdate = User.create(user);

    const findPlan = await this.plansRepository.findByName(plan, true);
    if (!findPlan && plan !== 'default')
      throw new HttpException('Plan not found', 400);

    const duration = plan === 'default' ? 36500 : data.duration;
    forUpdate.updatePlan(plan, duration);
    console.log(forUpdate.toJson());

    await this.userRepository.update(userId, forUpdate.toJson());

    const output = await this.userRepository.findByIdWithRelations(userId);
    delete output.password;
    return output;
  }
}

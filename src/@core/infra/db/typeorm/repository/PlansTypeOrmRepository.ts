import { IPlansOutput } from './../../../../domain/dtos/PlansDTO';
import { Repository } from 'typeorm';
import { IPlansRepository } from 'src/@core/domain/repositories/IPlansRepository';
import { Plans } from 'src/@core/domain/entities/plans.entity';

export class PlansTypeOrmRepository implements IPlansRepository{
    constructor(private ormRepo: Repository<Plans>){}

    async insert(plan: IPlansOutput): Promise<void>{
        await this.ormRepo.save(plan);
    }

    async findById(id: string, returnNull?: boolean): Promise<IPlansOutput | null>{
        const plan = await this.ormRepo.findOne({ where: { id } });
        if(!plan && returnNull){
            return null;
        } else if(!plan){
            throw new Error('Plan not found');
        }
        return plan;
    }

    async findByUserId(id: string, returnNull?: boolean): Promise<IPlansOutput | null>{
        const plan = await this.ormRepo.findOne({ where: { userId: id } });
        if(!plan && returnNull){
            return null;
        } else if(!plan){
            throw new Error('Plan not found');
        }
        return plan;
    }

    async findAll(): Promise<IPlansOutput[] | null> {
        return await this.ormRepo.find();
    }

    async update(id: string, data: IPlansOutput): Promise<IPlansOutput> {
        const plan = await this.ormRepo.findOne({ where: { id } });
        plan.plan = data.plan || plan.plan;
        plan.expirationDate = data.expirationDate || plan.expirationDate;
        await this.ormRepo.save(plan);
        return plan;
    }
    
    async delete(id: string): Promise<void> {
        await this.ormRepo.delete({ id });
    }
}
import { createUUID } from "../utils/createUUID";


export type IPlansProps = {
    id?: string;
    userId: string;
    plan: string;
    expirationDate?: Date;
    createdAt?: Date;
};

export class Plans {
    public readonly id: string;
    public userId: Required<IPlansProps['userId']>;
    public plan: Required<IPlansProps['plan']>;
    public expirationDate: Required<IPlansProps['expirationDate']>;
    public createdAt: Required<IPlansProps['createdAt']>;

    private constructor(props: IPlansProps, id?: string) {
        this.id = id || createUUID();

        if (!props) {
            this.userId = null;
            this.plan = null;
            this.expirationDate = null;
            this.createdAt = null;
            return;
        }
        const today = new Date();

        this.userId = props.userId;
        this.plan = props.plan;
        this.expirationDate = props.expirationDate || new Date(today.setDate(today.getDate() + 30));
        this.createdAt = props.createdAt || new Date();
    }

    static create(props: IPlansProps, id?: string): Plans {
        return new Plans(props, id);
    }

    public updatePlan(plan: string): void {
        this.plan = plan;
    }

    public updateExpirationDate(expirationDate: Date): void {
        this.expirationDate = expirationDate;
    }

    public toJson(): IPlansProps {
        return {
            id: this.id,
            userId: this.userId,
            plan: this.plan,
            expirationDate: this.expirationDate,
            createdAt: this.createdAt,
        };
    }
}
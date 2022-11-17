import { createUUID } from "../utils/createUUID";


type IQuotaProps = {
    id: string;
    userId: string;
    plan: string;
    expiratonDate: string;
};

//TODO see if is a valid plan
export class Quota {
    public readonly id: string;
    public userId: Required<IQuotaProps['userId']>;
    public plan: Required<IQuotaProps['plan']>;
    public expiratonDate: Required<IQuotaProps['expiratonDate']>;

    private constructor(props: IQuotaProps, id?: string) {
        this.id = id || createUUID();

        if (!props) {
            this.userId = null;
            this.plan = null;
            this.expiratonDate = null;
            return;
        }

        this.userId = props.userId;
        this.plan = props.plan;
        this.expiratonDate = props.expiratonDate;
    }

    static create(props: IQuotaProps, id?: string): Quota {
        return new Quota(props, id);
    }

    public updatePlan(plan: string): void {
        this.plan = plan;
    }

    public updateExpirationDate(expirationDate: string): void {
        this.expiratonDate = expirationDate;
    }
}
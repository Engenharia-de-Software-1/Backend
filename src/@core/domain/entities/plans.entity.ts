import { createUUID } from "../utils/createUUID";


export type IPlansProps = {
    id?: string;
    plan: string;
    permissions: string;
};

export class Plans {
    public readonly id: string;
    public plan: Required<IPlansProps['plan']>;
    public permissions: Required<IPlansProps['permissions']>;

    private constructor(props: IPlansProps, id?: string) {
        this.id = id || createUUID();

        if (!props) {
            this.plan = null;
            this.permissions = null;
            return;
        }
        const today = new Date();

        this.plan = props.plan;
        this.permissions = props.permissions;
    }

    static create(props: IPlansProps, id?: string): Plans {
        return new Plans(props, id);
    }

    public updatePlan(plan: string): void {
        this.plan = plan;
    }

    public updatePermissions(permissions: string): void {
        this.permissions = permissions;
    }

    public toJson(): IPlansProps {
        return {
            id: this.id,
            plan: this.plan,
            permissions: this.permissions,
        };
    }
}
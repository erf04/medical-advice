import { Exclude, Expose } from "class-transformer";
import { User, UserRole } from "./users.entity";


export class UserOut {
    @Expose()
    id : number
    @Expose() 
    firstName: string;
    @Expose()
    lastName: string;
    @Expose()
    phone: string;
    @Expose()
    email?: string;
    @Expose()
    role: UserRole;
    @Expose()
    createdAt: Date;

    @Expose()
    get isAdmin():boolean {
        return this.role === 'admin';
    }

}
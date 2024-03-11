import {User} from "@prisma/client";

interface RepositoryInterface
{
    login(payload: User): Promise<boolean>
    logout(): Promise<void>
    register(payload: User): Promise<void>
    delete(email: string): Promise<void>
    update(payload: User): Promise<void>
}

// todo: fai tutto
class UserRepository implements RepositoryInterface
{
    users: User[] = [];

    constructor() {
        this.users.push({
            email: "a@a.it",
            password: "test"
        })
    }

    delete(email: string): Promise<void> {
        return Promise.resolve(undefined);
    }

    login(payload: User): Promise<boolean> {
        return Promise.resolve(true);
    }

    logout(): Promise<void> {
        return Promise.resolve(undefined);
    }

    register(payload: User): Promise<void> {
        return Promise.resolve(undefined);
    }

    update(payload: User): Promise<void> {
        return Promise.resolve(undefined);
    }

}

export default new UserRepository();

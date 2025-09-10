import { PrismaClient, User } from '@prisma/client';

export class UserModel {
    prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    // register
    public async register(user: User): Promise<User> {
        return this.prisma.user.create({ data: user });
    }

    public async getByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findFirst({ where: { email: email } });
    }
}

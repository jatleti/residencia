import { PrismaClient, Season } from '@prisma/client';
import { CustomResponse } from '../entities/customresponse';

export class SeasonFacade {
    prisma: PrismaClient;
    body: any;

    constructor(prisma: PrismaClient, body: any) {
        this.prisma = prisma;
        this.body = body;
    }

    public async list(): Promise<Season[]> {
        return this.prisma.season.findMany({ where: { deleted_at: null } });
    }

    public async get(id: string): Promise<Season | null> {
        if (!id) {
            throw <CustomResponse>{
                status: 500,
                message: 'Season not found',
            };
        }

        return this.prisma.season.findUnique({
            where: { id: id },
        });
    }

    public async add(season: Season): Promise<Season> {
        try {
            const s = await this.prisma.season.create({ data: season });
            if (s) {
                return this.get(s.id);
            }
        } catch (e) {
            console.error('e', e);
            throw <CustomResponse>{
                status: 500,
                message: 'Error creating season',
            };
        }
    }

    public async set(id: string, season: Season): Promise<Season> {
        if (!id) {
            throw <CustomResponse>{
                status: 500,
                message: 'Season not found',
            };
        }

        const data = <Season>season;

        try {
            await this.prisma.season.update({ where: { id: id }, data });
            return this.get(id);
        } catch (e) {
            console.error('e', e);
            throw <CustomResponse>{
                status: 500,
                message: 'Error updating season',
            };
        }
    }

    public async del(id: string): Promise<Season> {
        if (!id) {
            throw <CustomResponse>{
                status: 500,
                message: 'Season not found',
            };
        }

        const season = await this.prisma.season.findUnique({ where: { id: id } });
        if (!season) {
            throw <CustomResponse>{
                status: 404,
                message: 'Season not found',
            };
        }
        try {
            await this.prisma.season.delete({ where: { id: id } });
            return season;
        } catch (e) {
            throw <CustomResponse>{
                status: 500,
                message: 'Error deleting season ' + e,
            };
        }
    }
}

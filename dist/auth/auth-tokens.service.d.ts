import { PrismaService } from '../prisma/prisma.service';
import { AuthTokenType } from '../generated/prisma/client';
export declare class AuthTokensService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private hashToken;
    createToken(userId: number, type: AuthTokenType, ttlMs: number): Promise<string>;
    consumeToken(token: string, type: AuthTokenType): Promise<number | null>;
}

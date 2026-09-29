import { Injectable } from '@nestjs/common';
import { createHash, randomBytes } from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
import { AuthTokenType } from '../generated/prisma/client';

@Injectable()
export class AuthTokensService {
  constructor(private readonly prisma: PrismaService) {}

  private hashToken(token: string): string {
    return createHash('sha256').update(token).digest('hex');
  }

  async createToken(
    userId: number,
    type: AuthTokenType,
    ttlMs: number,
  ): Promise<string> {
    const token = randomBytes(32).toString('hex');
    const now = new Date();

    await this.prisma.$transaction([
      this.prisma.authToken.updateMany({
        where: { userId, type, usedAt: null },
        data: { usedAt: now },
      }),
      this.prisma.authToken.create({
        data: {
          userId,
          type,
          tokenHash: this.hashToken(token),
          expiresAt: new Date(now.getTime() + ttlMs),
        },
      }),
    ]);

    return token;
  }

  async consumeToken(
    token: string,
    type: AuthTokenType,
  ): Promise<number | null> {
    const record = await this.prisma.authToken.findUnique({
      where: { tokenHash: this.hashToken(token) },
    });

    if (!record || record.type !== type) {
      return null;
    }

    const { count } = await this.prisma.authToken.updateMany({
      where: {
        id: record.id,
        usedAt: null,
        expiresAt: { gt: new Date() },
      },
      data: { usedAt: new Date() },
    });

    return count === 1 ? record.userId : null;
  }
}

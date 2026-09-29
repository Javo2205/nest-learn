import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ConfigService } from '@nestjs/config';
import { MailService } from '../mail/mail.service';
import { AuthTokensService } from './auth-tokens.service';
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    private readonly authTokens;
    private readonly mail;
    private readonly config;
    private readonly logger;
    constructor(prisma: PrismaService, jwtService: JwtService, authTokens: AuthTokensService, mail: MailService, config: ConfigService);
    private sendVerification;
    register(registerDto: RegisterDto): Promise<{
        message: string;
    }>;
    verifyEmail(token: string): Promise<{
        message: string;
    }>;
    resendVerification(email: string): Promise<{
        message: string;
    }>;
    forgotPassword(email: string): Promise<{
        message: string;
    }>;
    resetPassword(token: string, newPassword: string): Promise<{
        message: string;
    }>;
    changePassword(userId: number, currentPassword: string, newPassword: string): Promise<{
        message: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
    }>;
}

import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';
export declare class MailService {
    private readonly mailer;
    private readonly config;
    constructor(mailer: MailerService, config: ConfigService);
    private buildUrl;
    sendVerificationEmail(to: string, token: string): Promise<void>;
    sendPasswordResetEmail(to: string, token: string): Promise<void>;
}

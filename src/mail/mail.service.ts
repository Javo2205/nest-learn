import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(
    private readonly mailer: MailerService,
    private readonly config: ConfigService,
  ) {}

  private buildUrl(path: string, token: string): string {
    const base = this.config.getOrThrow<string>('FRONTEND_URL');
    return `${base}${path}?token=${encodeURIComponent(token)}`;
  }

  async sendVerificationEmail(to: string, token: string): Promise<void> {
    const url = this.buildUrl('/verify-email', token);
    const hours = this.config.getOrThrow<string>(
      'EMAIL_VERIFICATION_EXPIRES_HOURS',
    );

    await this.mailer.sendMail({
      from: this.config.getOrThrow<string>('MAIL_FROM'),
      to,
      subject: 'Confirma tu correo - Task API',
      text: `Confirma tu cuenta abriendo este enlace: ${url}\nEl enlace expira en ${hours} horas.`,
      html: `
        <h2>Confirma tu correo</h2>
        <p>Haz clic en el botón para activar tu cuenta:</p>
        <p><a href="${url}" style="background:#4f46e5;color:#fff;padding:10px 18px;border-radius:6px;text-decoration:none;">Confirmar correo</a></p>
        <p>El enlace expira en ${hours} horas. Si no creaste esta cuenta, ignora este mensaje.</p>
      `,
    });
  }

  async sendPasswordResetEmail(to: string, token: string): Promise<void> {
    const url = this.buildUrl('/reset-password', token);
    const minutes = this.config.getOrThrow<string>(
      'PASSWORD_RESET_EXPIRES_MINUTES',
    );

    await this.mailer.sendMail({
      from: this.config.getOrThrow<string>('MAIL_FROM'),
      to,
      subject: 'Restablece tu contraseña - Task API',
      text: `Restablece tu contraseña abriendo este enlace: ${url}\nEl enlace expira en ${minutes} minutos.`,
      html: `
        <h2>Restablecer contraseña</h2>
        <p>Recibimos una solicitud para restablecer tu contraseña:</p>
        <p><a href="${url}" style="background:#4f46e5;color:#fff;padding:10px 18px;border-radius:6px;text-decoration:none;">Restablecer contraseña</a></p>
        <p>El enlace expira en ${minutes} minutos. Si no lo solicitaste, ignora este mensaje; tu contraseña no cambiará.</p>
      `,
    });
  }
}

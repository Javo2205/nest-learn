import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailService } from '../mail/mail.service';
import { AuthTokensService } from './auth-tokens.service';
import { AuthTokenType } from '../generated/prisma/client';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly authTokens: AuthTokensService,
    private readonly mail: MailService,
    private readonly config: ConfigService,
  ) {}

  private async sendVerification(userId: number, email: string): Promise<void> {
    try {
      const hours = Number(
        this.config.getOrThrow<string>('EMAIL_VERIFICATION_EXPIRES_HOURS'),
      );
      const token = await this.authTokens.createToken(
        userId,
        AuthTokenType.EMAIL_VERIFICATION,
        hours * 60 * 60 * 1000,
      );
      await this.mail.sendVerificationEmail(email, token);
    } catch (error) {
      this.logger.error(
        `Fallo al enviar verificación al usuario ${userId}`,
        error instanceof Error ? error.stack : undefined,
      );
    }
  }

  async register(registerDto: RegisterDto) {
    const { email, password } = registerDto;
    const message =
      'Si el correo es válido, recibirás un enlace para confirmar tu cuenta';

    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      if (!existingUser.emailVerified) {
        await this.sendVerification(existingUser.id, existingUser.email);
      }
      return { message };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: { email, password: hashedPassword },
      select: { id: true, email: true },
    });

    await this.sendVerification(user.id, user.email);

    return { message };
  }

  async verifyEmail(token: string) {
    const userId = await this.authTokens.consumeToken(
      token,
      AuthTokenType.EMAIL_VERIFICATION,
    );

    if (!userId) {
      throw new BadRequestException('El enlace es inválido o ha expirado');
    }

    await this.prisma.user.update({
      where: { id: userId },
      data: { emailVerified: true },
    });

    return { message: 'Correo confirmado. Ya puedes iniciar sesión' };
  }

  async resendVerification(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (user && !user.emailVerified) {
      await this.sendVerification(user.id, user.email);
    }

    return {
      message:
        'Si el correo es válido, recibirás un enlace para confirmar tu cuenta',
    };
  }

  async forgotPassword(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (user) {
      try {
        const minutes = Number(
          this.config.getOrThrow<string>('PASSWORD_RESET_EXPIRES_MINUTES'),
        );
        const token = await this.authTokens.createToken(
          user.id,
          AuthTokenType.PASSWORD_RESET,
          minutes * 60 * 1000,
        );
        await this.mail.sendPasswordResetEmail(user.email, token);
      } catch (error) {
        this.logger.error(
          `Fallo al enviar recuperación al usuario ${user.id}`,
          error instanceof Error ? error.stack : undefined,
        );
      }
    }

    return {
      message:
        'Si el correo está registrado, recibirás instrucciones para restablecer tu contraseña',
    };
  }

  async resetPassword(token: string, newPassword: string) {
    const userId = await this.authTokens.consumeToken(
      token,
      AuthTokenType.PASSWORD_RESET,
    );

    if (!userId) {
      throw new BadRequestException('El enlace es inválido o ha expirado');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        password: hashedPassword,
        emailVerified: true,
      },
    });

    return { message: 'Contraseña actualizada. Ya puedes iniciar sesión' };
  }

  async changePassword(
    userId: number,
    currentPassword: string,
    newPassword: string,
  ) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const passwordMatches = await bcrypt.compare(
      currentPassword,
      user.password,
    );

    if (!passwordMatches) {
      throw new UnauthorizedException('La contraseña actual es incorrecta');
    }

    if (await bcrypt.compare(newPassword, user.password)) {
      throw new BadRequestException(
        'La nueva contraseña debe ser distinta a la actual',
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await this.prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    return { message: 'Contraseña actualizada correctamente' };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    if (!user.emailVerified) {
      throw new ForbiddenException(
        'Confirma tu correo antes de iniciar sesión',
      );
    }

    const payload = {
      sub: user.id,
      email: user.email,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}

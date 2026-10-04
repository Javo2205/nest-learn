import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiTooManyRequestsResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { minutes, Throttle } from '@nestjs/throttler';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { ResendVerificationDto } from './dto/resend-verification.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LoginResponseDto } from '../common/dto/login-response.dto';
import type { AuthenticatedRequest } from '../common/interfaces/authenticated-request.interface';
import { MessageResponseDto } from '../common/dto/message-response.dto';

const TOO_MANY_REQUESTS = 'Demasiadas peticiones. Espera un minuto.';

@ApiTags('Autenticación')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Throttle({ default: { limit: 5, ttl: minutes(1) } })
  @Post('register')
  @ApiOperation({ summary: 'Registrar un usuario nuevo' })
  @ApiCreatedResponse({
    description: 'Mensaje neutro; se envía correo de verificación si aplica',
    type: MessageResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Email o contraseña inválidos' })
  @ApiTooManyRequestsResponse({ description: TOO_MANY_REQUESTS })
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Throttle({ default: { limit: 5, ttl: minutes(1) } })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Iniciar sesión y obtener un JWT' })
  @ApiOkResponse({
    description: 'JWT generado correctamente',
    type: LoginResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Email o contraseña inválidos' })
  @ApiUnauthorizedResponse({ description: 'Credenciales inválidas' })
  @ApiForbiddenResponse({
    description: 'Confirma tu correo antes de iniciar sesión',
  })
  @ApiTooManyRequestsResponse({ description: TOO_MANY_REQUESTS })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('verify-email')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Confirmar el correo con el token recibido' })
  @ApiOkResponse({ description: 'Correo confirmado', type: MessageResponseDto })
  @ApiBadRequestResponse({ description: 'Token inválido o expirado' })
  verifyEmail(@Body() dto: VerifyEmailDto) {
    return this.authService.verifyEmail(dto.token);
  }

  @Throttle({ default: { limit: 3, ttl: minutes(1) } })
  @Post('resend-verification')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reenviar el correo de verificación' })
  @ApiOkResponse({
    description: 'Mensaje neutro, exista o no la cuenta',
    type: MessageResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Email inválido' })
  @ApiTooManyRequestsResponse({ description: TOO_MANY_REQUESTS })
  resendVerification(@Body() dto: ResendVerificationDto) {
    return this.authService.resendVerification(dto.email);
  }

  @Throttle({ default: { limit: 3, ttl: minutes(1) } })
  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Solicitar enlace para restablecer la contraseña' })
  @ApiOkResponse({
    description: 'Mensaje neutro, exista o no la cuenta',
    type: MessageResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Email inválido' })
  @ApiTooManyRequestsResponse({ description: TOO_MANY_REQUESTS })
  forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.authService.forgotPassword(dto.email);
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Restablecer la contraseña con el token recibido' })
  @ApiOkResponse({
    description: 'Contraseña actualizada',
    type: MessageResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Token inválido o expirado, o contraseña no válida',
  })
  resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto.token, dto.newPassword);
  }

  @Patch('change-password')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Cambiar la contraseña del usuario autenticado' })
  @ApiOkResponse({
    description: 'Contraseña actualizada',
    type: MessageResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'JWT inválido o contraseña actual incorrecta',
  })
  @ApiBadRequestResponse({
    description: 'Nueva contraseña no válida o igual a la actual',
  })
  changePassword(
    @Req() request: AuthenticatedRequest,
    @Body() dto: ChangePasswordDto,
  ) {
    return this.authService.changePassword(
      request.user.id,
      dto.currentPassword,
      dto.newPassword,
    );
  }
}

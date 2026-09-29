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
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { LoginResponseDto } from '../common/dto/login-response.dto';
import { UserResponseDto } from '../common/dto/user-response.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { ResendVerificationDto } from './dto/resend-verification.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ChangePasswordDto } from './dto/change-password.dto';
import type { AuthenticatedRequest } from '../common/interfaces/authenticated-request.interface';

@ApiTags('Autenticación')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //   @ApiResponse({ status: 201, description: 'Usuario registrado correctamente' })
  //   @ApiResponse({ status: 400, description: 'Email o contraseña inválidos' })
  //   @ApiResponse({ status: 409, description: 'El email ya está registrado' })
  @Post('register')
  @ApiOperation({ summary: 'Registrar un usuario nuevo' })
  @ApiCreatedResponse({
    description: 'Usuario registrado correctamente',
    type: UserResponseDto,
  })
  @ApiConflictResponse({
    description: 'El email ya está registrado',
  })
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  //   @ApiOperation({ summary: 'Iniciar sesión y obtener un JWT' })
  //   @ApiResponse({ status: 201, description: 'JWT generado correctamente' })
  //   @ApiResponse({ status: 400, description: 'Email o contraseña inválidos' })
  //   @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión y obtener un JWT' })
  @ApiCreatedResponse({
    description: 'JWT generado correctamente',
    type: LoginResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Credenciales inválidas',
  })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('verify-email')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Confirmar el correo con el token recibido' })
  @ApiOkResponse({ description: 'Correo confirmado' })
  @ApiBadRequestResponse({ description: 'Token inválido o expirado' })
  verifyEmail(@Body() dto: VerifyEmailDto) {
    return this.authService.verifyEmail(dto.token);
  }

  @Post('resend-verification')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reenviar el correo de verificación' })
  @ApiOkResponse({ description: 'Mensaje neutro, exista o no la cuenta' })
  resendVerification(@Body() dto: ResendVerificationDto) {
    return this.authService.resendVerification(dto.email);
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Solicitar enlace para restablecer la contraseña' })
  @ApiOkResponse({ description: 'Mensaje neutro, exista o no la cuenta' })
  forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.authService.forgotPassword(dto.email);
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Restablecer la contraseña con el token recibido' })
  @ApiOkResponse({ description: 'Contraseña actualizada' })
  @ApiBadRequestResponse({
    description: 'Token inválido o expirado, o contraseña no válida',
  })
  resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto.token, dto.newPassword);
  }

  @Patch('change-password')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cambiar la contraseña del usuario autenticado' })
  @ApiOkResponse({ description: 'Contraseña actualizada' })
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

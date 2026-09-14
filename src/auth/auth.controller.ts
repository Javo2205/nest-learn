import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { LoginResponseDto } from '../common/dto/login-response.dto';
import { UserResponseDto } from '../common/dto/user-response.dto';

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
}

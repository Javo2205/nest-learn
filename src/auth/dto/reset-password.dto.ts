import { ApiProperty } from '@nestjs/swagger';
import { IsHexadecimal, IsString, Length, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty({ description: 'Token recibido en el correo de recuperación' })
  @IsHexadecimal()
  @Length(64, 64)
  token: string;

  @ApiProperty({ example: 'NuevaClave123', minLength: 8 })
  @IsString()
  @MinLength(8)
  newPassword: string;
}

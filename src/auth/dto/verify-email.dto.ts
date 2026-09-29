import { ApiProperty } from '@nestjs/swagger';
import { IsHexadecimal, Length } from 'class-validator';

export class VerifyEmailDto {
  @ApiProperty({
    description: 'Token recibido en el correo de verificación',
    example: 'a'.repeat(64),
  })
  @IsHexadecimal()
  @Length(64, 64)
  token: string;
}

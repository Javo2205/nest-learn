import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({
    example: 1,
    description: 'ID único del usuario',
  })
  id: number;

  @ApiProperty({
    example: 'usuario@ejemplo.com',
    description: 'Correo electrónico único del usuario',
  })
  email: string;

  @ApiProperty({
    example: '2026-09-13T22:00:00.000Z',
    description: 'Fecha de registro del usuario',
    format: 'date-time',
  })
  createdAt: Date;
}

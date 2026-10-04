import { ApiProperty } from '@nestjs/swagger';

export class MessageResponseDto {
  @ApiProperty({
    example: 'Operación realizada correctamente',
    description: 'Mensaje informativo para mostrar al usuario',
  })
  message: string;
}

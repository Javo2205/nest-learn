import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TaskResponseDto {
  @ApiProperty({
    example: 1,
    description: 'ID único de la tarea',
  })
  id: number;

  @ApiProperty({
    example: 'Terminar documentación',
    description: 'Título de la tarea',
  })
  title: string;

  @ApiPropertyOptional({
    example: 'Agregar documentación Swagger a la API',
    description: 'Descripción de la tarea; puede no existir',
    nullable: true,
  })
  description: string | null;

  @ApiProperty({
    example: false,
    description: 'Indica si la tarea está completada',
  })
  completed: boolean;

  @ApiProperty({
    example: 1,
    description: 'ID del usuario propietario de la tarea',
  })
  userId: number;
}

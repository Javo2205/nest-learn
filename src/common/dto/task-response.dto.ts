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
    example: '2026-09-28T23:17:43.713Z',
    description: 'Fecha de creación (ISO 8601)',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2026-09-29T10:05:12.000Z',
    description: 'Fecha de última actualización (ISO 8601)',
  })
  updatedAt: Date;

  @ApiProperty({
    example: 1,
    description: 'ID del usuario propietario de la tarea',
  })
  userId: number;
}

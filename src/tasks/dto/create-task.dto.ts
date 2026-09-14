import { IsBoolean, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({
    example: 'Terminar documentación',
    description: 'Título de la tarea',
    minLength: 3,
  })
  @IsString()
  @MinLength(3)
  title: string;

  @ApiPropertyOptional({
    example: 'Agregar documentación Swagger a la API',
    description: 'Descripción opcional de la tarea',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    example: false,
    description: 'Indica si la tarea está completada',
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  completed?: boolean;
}

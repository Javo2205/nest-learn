import { ApiProperty } from '@nestjs/swagger';

export class PaginationMetaDto {
  @ApiProperty({
    example: 10,
    description: 'Total de tareas que cumplen el filtro',
  })
  total: number;

  @ApiProperty({ example: 1, description: 'Página actual' })
  page: number;

  @ApiProperty({ example: 10, description: 'Tareas por página' })
  limit: number;

  @ApiProperty({ example: 1, description: 'Total de páginas' })
  totalPages: number;
}

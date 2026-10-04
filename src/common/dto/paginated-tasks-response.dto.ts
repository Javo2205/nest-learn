import { ApiProperty } from '@nestjs/swagger';
import { TaskResponseDto } from './task-response.dto';
import { PaginationMetaDto } from './pagination-meta.dto';

export class PaginatedTasksResponseDto {
  @ApiProperty({
    type: [TaskResponseDto],
    description: 'Tareas de la página actual',
  })
  data: TaskResponseDto[];

  @ApiProperty({
    type: PaginationMetaDto,
    description: 'Metadatos de paginación',
  })
  meta: PaginationMetaDto;
}

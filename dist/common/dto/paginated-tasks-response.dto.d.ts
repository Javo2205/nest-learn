import { TaskResponseDto } from './task-response.dto';
import { PaginationMetaDto } from './pagination-meta.dto';
export declare class PaginatedTasksResponseDto {
    data: TaskResponseDto[];
    meta: PaginationMetaDto;
}

import { PaginationMetaDto } from './pagination-meta.dto';
import { TaskResponseDto } from '../../common/dto/task-response.dto';
export declare class PaginatedTasksResponseDto {
    data: TaskResponseDto[];
    meta: PaginationMetaDto;
}

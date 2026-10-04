export declare class FindTasksQueryDto {
    page: number;
    limit: number;
    completed?: boolean;
    search?: string;
    sortBy: 'createdAt' | 'updatedAt' | 'title';
    order: 'asc' | 'desc';
}

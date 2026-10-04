import { Request } from 'express';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksService } from './tasks.service';
import { FindTasksQueryDto } from './dto/find-tasks-query.dto';
interface AuthenticatedRequest extends Request {
    user: {
        id: number;
        email: string;
    };
}
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    create(createTaskDto: CreateTaskDto, request: AuthenticatedRequest): Promise<{
        title: string;
        description: string | null;
        completed: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
    }>;
    findAll(request: AuthenticatedRequest, query: FindTasksQueryDto): Promise<{
        data: {
            title: string;
            description: string | null;
            completed: boolean;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            userId: number;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: number, request: AuthenticatedRequest): Promise<{
        title: string;
        description: string | null;
        completed: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
    }>;
    update(id: number, updateTaskDto: UpdateTaskDto, request: AuthenticatedRequest): Promise<{
        title: string;
        description: string | null;
        completed: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
    }>;
    remove(id: number, request: AuthenticatedRequest): Promise<{
        title: string;
        description: string | null;
        completed: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
    }>;
}
export {};

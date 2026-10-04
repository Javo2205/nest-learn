import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { FindTasksQueryDto } from './dto/find-tasks-query.dto';
export declare class TasksService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createTaskDto: CreateTaskDto, userId: number): Promise<{
        description: string | null;
        title: string;
        completed: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
    }>;
    findAll(userId: number, query: FindTasksQueryDto): Promise<{
        data: {
            description: string | null;
            title: string;
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
    findOne(id: number, userId: number): Promise<{
        description: string | null;
        title: string;
        completed: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
    }>;
    update(id: number, updateTaskDto: UpdateTaskDto, userId: number): Promise<{
        description: string | null;
        title: string;
        completed: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
    }>;
    remove(id: number, userId: number): Promise<{
        description: string | null;
        title: string;
        completed: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
    }>;
}

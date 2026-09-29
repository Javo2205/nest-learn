import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
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
    findAll(userId: number): Promise<{
        description: string | null;
        title: string;
        completed: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
    }[]>;
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

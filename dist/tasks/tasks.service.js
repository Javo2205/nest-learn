"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let TasksService = class TasksService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createTaskDto, userId) {
        return this.prisma.task.create({
            data: {
                title: createTaskDto.title,
                description: createTaskDto.description,
                completed: createTaskDto.completed ?? false,
                user: {
                    connect: { id: userId },
                },
            },
        });
    }
    async findAll(userId, query) {
        const { page, limit, completed, search, sortBy, order } = query;
        const where = {
            userId,
            ...(completed !== undefined && { completed }),
            ...(search && {
                title: { contains: search, mode: 'insensitive' },
            }),
        };
        const [data, total] = await this.prisma.$transaction([
            this.prisma.task.findMany({
                where,
                orderBy: { [sortBy]: order },
                skip: (page - 1) * limit,
                take: limit,
            }),
            this.prisma.task.count({ where }),
        ]);
        return {
            data,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async findOne(id, userId) {
        const task = await this.prisma.task.findFirst({
            where: {
                id,
                userId,
            },
        });
        if (!task) {
            throw new common_1.NotFoundException(`Tarea con id ${id} no encontrada`);
        }
        return task;
    }
    async update(id, updateTaskDto, userId) {
        await this.findOne(id, userId);
        return this.prisma.task.update({
            where: { id },
            data: updateTaskDto,
        });
    }
    async remove(id, userId) {
        await this.findOne(id, userId);
        return this.prisma.task.delete({
            where: { id },
        });
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TasksService);
//# sourceMappingURL=tasks.service.js.map
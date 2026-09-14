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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const create_task_dto_1 = require("./dto/create-task.dto");
const update_task_dto_1 = require("./dto/update-task.dto");
const tasks_service_1 = require("./tasks.service");
const swagger_1 = require("@nestjs/swagger");
const task_response_dto_1 = require("../common/dto/task-response.dto");
let TasksController = class TasksController {
    tasksService;
    constructor(tasksService) {
        this.tasksService = tasksService;
    }
    create(createTaskDto, request) {
        return this.tasksService.create(createTaskDto, request.user.id);
    }
    findAll(request) {
        return this.tasksService.findAll(request.user.id);
    }
    findOne(id, request) {
        return this.tasksService.findOne(id, request.user.id);
    }
    update(id, updateTaskDto, request) {
        return this.tasksService.update(id, updateTaskDto, request.user.id);
    }
    remove(id, request) {
        return this.tasksService.remove(id, request.user.id);
    }
};
exports.TasksController = TasksController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Crear una tarea para el usuario autenticado' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Tarea creada correctamente',
        type: task_response_dto_1.TaskResponseDto,
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: 'JWT ausente, inválido o expirado',
    }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_task_dto_1.CreateTaskDto, Object]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Obtener las tareas del usuario autenticado' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Lista de tareas del usuario',
        type: [task_response_dto_1.TaskResponseDto],
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: 'JWT ausente, inválido o expirado',
    }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Obtener una tarea propia por ID' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: Number,
        example: 1,
        description: 'ID numérico de la tarea',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Tarea encontrada',
        type: task_response_dto_1.TaskResponseDto,
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: 'Tarea no encontrada o no pertenece al usuario',
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: 'JWT ausente, inválido o expirado',
    }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar una tarea propia' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: Number,
        example: 1,
        description: 'ID numérico de la tarea',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Tarea actualizada correctamente',
        type: task_response_dto_1.TaskResponseDto,
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: 'Tarea no encontrada o no pertenece al usuario',
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: 'JWT ausente, inválido o expirado',
    }),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_task_dto_1.UpdateTaskDto, Object]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar una tarea propia' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: Number,
        example: 1,
        description: 'ID numérico de la tarea',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Tarea eliminada correctamente',
        type: task_response_dto_1.TaskResponseDto,
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: 'Tarea no encontrada o no pertenece al usuario',
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: 'JWT ausente, inválido o expirado',
    }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "remove", null);
exports.TasksController = TasksController = __decorate([
    (0, swagger_1.ApiTags)('Tareas'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('tasks'),
    __metadata("design:paramtypes", [tasks_service_1.TasksService])
], TasksController);
//# sourceMappingURL=tasks.controller.js.map
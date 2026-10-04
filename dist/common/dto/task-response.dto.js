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
exports.TaskResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class TaskResponseDto {
    id;
    title;
    description;
    completed;
    createdAt;
    updatedAt;
    userId;
}
exports.TaskResponseDto = TaskResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'ID único de la tarea',
    }),
    __metadata("design:type", Number)
], TaskResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Terminar documentación',
        description: 'Título de la tarea',
    }),
    __metadata("design:type", String)
], TaskResponseDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Agregar documentación Swagger a la API',
        description: 'Descripción de la tarea; puede no existir',
        nullable: true,
    }),
    __metadata("design:type", Object)
], TaskResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: false,
        description: 'Indica si la tarea está completada',
    }),
    __metadata("design:type", Boolean)
], TaskResponseDto.prototype, "completed", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2026-09-28T23:17:43.713Z',
        description: 'Fecha de creación (ISO 8601)',
    }),
    __metadata("design:type", Date)
], TaskResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2026-09-29T10:05:12.000Z',
        description: 'Fecha de última actualización (ISO 8601)',
    }),
    __metadata("design:type", Date)
], TaskResponseDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'ID del usuario propietario de la tarea',
    }),
    __metadata("design:type", Number)
], TaskResponseDto.prototype, "userId", void 0);
//# sourceMappingURL=task-response.dto.js.map
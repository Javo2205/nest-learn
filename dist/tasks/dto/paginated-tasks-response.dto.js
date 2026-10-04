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
exports.PaginatedTasksResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const pagination_meta_dto_1 = require("./pagination-meta.dto");
const task_response_dto_1 = require("../../common/dto/task-response.dto");
class PaginatedTasksResponseDto {
    data;
    meta;
}
exports.PaginatedTasksResponseDto = PaginatedTasksResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [task_response_dto_1.TaskResponseDto],
        description: 'Tareas de la página actual',
    }),
    __metadata("design:type", Array)
], PaginatedTasksResponseDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: pagination_meta_dto_1.PaginationMetaDto,
        description: 'Metadatos de paginación',
    }),
    __metadata("design:type", pagination_meta_dto_1.PaginationMetaDto)
], PaginatedTasksResponseDto.prototype, "meta", void 0);
//# sourceMappingURL=paginated-tasks-response.dto.js.map
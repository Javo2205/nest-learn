import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksService } from './tasks.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { TaskResponseDto } from '../common/dto/task-response.dto';
import { FindTasksQueryDto } from './dto/find-tasks-query.dto';
import { PaginatedTasksResponseDto } from '../common/dto/paginated-tasks-response.dto';

interface AuthenticatedRequest extends Request {
  user: {
    id: number;
    email: string;
  };
}

@ApiTags('Tareas')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @ApiOperation({ summary: 'Crear una tarea para el usuario autenticado' })
  @ApiCreatedResponse({
    description: 'Tarea creada correctamente',
    type: TaskResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'JWT ausente, inválido o expirado',
  })
  @Post()
  create(
    @Body() createTaskDto: CreateTaskDto,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.tasksService.create(createTaskDto, request.user.id);
  }

  @ApiOperation({
    summary: 'Obtener las tareas del usuario autenticado (paginadas)',
  })
  @ApiOkResponse({
    description: 'Tareas paginadas con metadatos',
    type: PaginatedTasksResponseDto,
  })
  @ApiBadRequestResponse({
    description:
      'Parámetros de consulta inválidos (page, limit, completed, sortBy u order)',
  })
  @ApiUnauthorizedResponse({
    description: 'JWT ausente, inválido o expirado',
  })
  @Get()
  findAll(
    @Req() request: AuthenticatedRequest,
    @Query() query: FindTasksQueryDto,
  ) {
    return this.tasksService.findAll(request.user.id, query);
  }

  @ApiOperation({ summary: 'Obtener una tarea propia por ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'ID numérico de la tarea',
  })
  @ApiOkResponse({
    description: 'Tarea encontrada',
    type: TaskResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Tarea no encontrada o no pertenece al usuario',
  })
  @ApiUnauthorizedResponse({
    description: 'JWT ausente, inválido o expirado',
  })
  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.tasksService.findOne(id, request.user.id);
  }

  @ApiOperation({ summary: 'Actualizar una tarea propia' })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'ID numérico de la tarea',
  })
  @ApiOkResponse({
    description: 'Tarea actualizada correctamente',
    type: TaskResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Tarea no encontrada o no pertenece al usuario',
  })
  @ApiUnauthorizedResponse({
    description: 'JWT ausente, inválido o expirado',
  })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.tasksService.update(id, updateTaskDto, request.user.id);
  }

  @ApiOperation({ summary: 'Eliminar una tarea propia' })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'ID numérico de la tarea',
  })
  @ApiOkResponse({
    description: 'Tarea eliminada correctamente',
    type: TaskResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Tarea no encontrada o no pertenece al usuario',
  })
  @ApiUnauthorizedResponse({
    description: 'JWT ausente, inválido o expirado',
  })
  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.tasksService.remove(id, request.user.id);
  }
}

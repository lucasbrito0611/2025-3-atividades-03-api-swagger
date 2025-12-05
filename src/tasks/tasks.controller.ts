import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task.entity';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  // =============================================
  // GET /tasks - LISTAR TODAS
  // =============================================
  @Get()
  @ApiOperation({
    summary: 'Listar todas as tarefas',
    description: 'Retorna uma lista contendo todas as tarefas cadastradas.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de tarefas retornada com sucesso.',
    type: [Task],
  })
  findAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  // =============================================
  // GET /tasks/:id - BUSCAR UMA
  // =============================================
  @Get(':id')
  @ApiOperation({
    summary: 'Buscar uma tarefa pelo ID',
    description:
      'Retorna todas as informações de uma tarefa específica baseada no ID informado.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da tarefa',
    type: Number,
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Tarefa encontrada com sucesso.',
    type: Task,
  })
  @ApiResponse({
    status: 404,
    description: 'Tarefa não encontrada.',
  })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.tasksService.findOne(id);
  }


  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Criar uma nova tarefa',
    description:
      'Cria uma nova tarefa com título, descrição e status opcional.',
  })
  @ApiBody({
    type: CreateTaskDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Tarefa criada com sucesso.',
    type: Task,
  })
  @ApiResponse({
    status: 400,
    description:
      'Dados inválidos enviados. Verifique os campos obrigatórios e formatos.',
  })
  create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.create(createTaskDto);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Atualizar uma tarefa existente',
    description:
      'Atualiza os dados de uma tarefa com base no ID informado. Campos são opcionais.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da tarefa a ser atualizada',
    type: Number,
    example: 1,
  })
  @ApiBody({
    type: UpdateTaskDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Tarefa atualizada com sucesso.',
    type: Task,
  })
  @ApiResponse({
    status: 404,
    description: 'Tarefa não encontrada.',
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos enviados.',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Excluir uma tarefa',
    description: 'Remove uma tarefa definitivamente com base no ID informado.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da tarefa a ser removida',
    type: Number,
    example: 1,
  })
  @ApiResponse({
    status: 204,
    description: 'Tarefa removida com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Tarefa não encontrada.',
  })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.tasksService.remove(id);
  }
}

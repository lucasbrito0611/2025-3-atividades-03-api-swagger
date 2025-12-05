import { IsString, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { TaskStatus } from '../task.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Título da tarefa',
    example: 'Criar CRUD de tarefas',
    minLength: 3,
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Descrição detalhada da tarefa',
    example: 'Implementar a criação, listagem, edição e exclusão de tarefas.',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiPropertyOptional({
    description: 'Status inicial da tarefa (opcional)',
    enum: TaskStatus,
    default: TaskStatus.ABERTO,
    example: TaskStatus.FAZENDO,
  })
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;
}

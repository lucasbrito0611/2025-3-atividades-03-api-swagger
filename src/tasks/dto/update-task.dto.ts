import { IsString, IsEnum, IsOptional } from 'class-validator';
import { TaskStatus } from '../task.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTaskDto {
  @ApiPropertyOptional({
    description: 'Título da tarefa',
    example: 'Atualizar layout da aplicação',
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({
    description: 'Descrição da tarefa',
    example: 'Melhorar a interface da tela de detalhes da tarefa.',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description: 'Novo status da tarefa',
    enum: TaskStatus,
    example: TaskStatus.FINALIZADO,
  })
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;
}

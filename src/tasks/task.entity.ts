import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export enum TaskStatus {
  ABERTO = 'aberto',
  FAZENDO = 'fazendo',
  FINALIZADO = 'finalizado',
}

@Entity()
export class Task {
  @ApiProperty({
    description: 'ID único da tarefa',
    type: Number,
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Título breve da tarefa',
    example: 'Estudar NestJS',
  })
  @Column()
  title: string;

  @ApiProperty({
    description: 'Descrição detalhada da tarefa',
    example: 'Assistir às aulas e praticar com projetos.',
  })
  @Column()
  description: string;

  @ApiProperty({
    description: 'Status atual da tarefa',
    enum: TaskStatus,
    default: TaskStatus.ABERTO,
    example: TaskStatus.FAZENDO,
  })
  @Column({
    type: 'text',
    enum: TaskStatus,
    default: TaskStatus.ABERTO,
  })
  status: TaskStatus;

  @ApiProperty({
    description: 'Data de criação do registro',
    type: String,
    example: '2025-02-20T14:30:00.000Z',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: 'Data da última atualização do registro',
    type: String,
    example: '2025-02-21T10:12:00.000Z',
  })
  @UpdateDateColumn()
  updatedAt: Date;
}

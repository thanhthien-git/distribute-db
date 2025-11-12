import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lop } from 'src/entities/lop.entity';
import { LopService } from './lop.service';
import { LopController } from './lop.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Lop], 'node1'),
    TypeOrmModule.forFeature([Lop], 'node2'),
  ],
  controllers: [LopController],
  providers: [LopService],
})
export class LopModule {}

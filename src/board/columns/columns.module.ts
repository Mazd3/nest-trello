import { Module } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { DbModule } from 'src/db/db.module';
import { ColumnsController } from './columns.controller';
import { CardsModule } from '../cards/cards.module';

@Module({
  imports: [DbModule, CardsModule],
  providers: [ColumnsService],
  controllers: [ColumnsController],
  exports: [ColumnsService],
})
export class ColumnsModule {}

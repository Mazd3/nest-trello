import { Module } from '@nestjs/common';
import { ColumnsModule } from './columns/columns.module';
import { CardsModule } from './cards/cards.module';
import { CommentsModule } from './comments/comments.module';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [ColumnsModule, CardsModule, CommentsModule, DbModule],
})
export class BoardModule {}

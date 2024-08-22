import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { DbModule } from 'src/db/db.module';
import { CardsController } from './cards.controller';
import { CommentsModule } from '../comments/comments.module';

@Module({
  imports: [DbModule, CommentsModule],
  providers: [CardsService],
  controllers: [CardsController],
  exports: [CardsService],
})
export class CardsModule {}

import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { CreateCommentDto, UpdateCommentDto } from './comments.dto';

@Injectable()
export class CommentsService {
  constructor(private dbService: DbService) {}

  async getCommentsByCardId(cardId: number) {
    return this.dbService.comment.findMany({
      where: { cardId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getCommentById(id: number) {
    const comment = await this.dbService.comment.findUnique({ where: { id } });
    if (!comment) throw new NotFoundException();
    return comment;
  }

  async createComment(
    userId: number,
    cardId: number,
    createCommentDto: CreateCommentDto,
  ) {
    const comment = await this.dbService.card.findUnique({
      where: { id: cardId },
      include: { column: { include: { user: true } } },
    });
    if (!comment) throw new NotFoundException();
    if (comment.column.user.id !== userId) throw new ForbiddenException();

    return this.dbService.comment.create({
      data: { ...createCommentDto, cardId },
    });
  }

  async updateComment(
    userId: number,
    commentId: number,
    updateCommentDto: UpdateCommentDto,
  ) {
    const comment = await this.dbService.comment.findUnique({
      where: { id: commentId },
      include: { card: { include: { column: { include: { user: true } } } } },
    });
    if (!comment) throw new NotFoundException();
    if (comment.card.column.user.id !== userId) throw new ForbiddenException();
    return this.dbService.comment.update({
      where: { id: commentId },
      data: updateCommentDto,
    });
  }

  async deleteComment(userId: number, commentId: number) {
    const comment = await this.dbService.comment.findUnique({
      where: { id: commentId },
      include: { card: { include: { column: { include: { user: true } } } } },
    });
    if (!comment) throw new NotFoundException();
    if (comment.card.column.user.id !== userId) throw new ForbiddenException();
    return this.dbService.comment.delete({ where: { id: commentId } });
  }
}

import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { CreateCardDto, UpdateCardDto } from './cards.dto';

@Injectable()
export class CardsService {
  constructor(private dbService: DbService) {}

  async getCardsByColumnId(columnId: number) {
    const cards = this.dbService.card.findMany({
      where: { columnId },
      orderBy: { createdAt: 'desc' },
    });
    return cards;
  }

  async getCardById(id: number) {
    const card = await this.dbService.card.findUnique({ where: { id } });
    if (!card) throw new NotFoundException();

    return card;
  }

  async createCard(
    userId: number,
    columnId: number,
    createCardDto: CreateCardDto,
  ) {
    const column = await this.dbService.column.findUnique({
      where: { id: columnId },
      include: { user: true },
    });
    if (!column) throw new NotFoundException();
    if (column.user.id !== userId) throw new ForbiddenException();

    return this.dbService.card.create({ data: { ...createCardDto, columnId } });
  }

  async updateCard(
    userId: number,
    cardId: number,
    updateCardDto: UpdateCardDto,
  ) {
    const card = await this.dbService.card.findUnique({
      where: { id: cardId },
      include: { column: { include: { user: true } } },
    });
    if (!card) throw new NotFoundException();
    if (card.column.user.id !== userId) throw new ForbiddenException();

    return this.dbService.card.update({
      where: { id: cardId },
      data: updateCardDto,
    });
  }

  async deleteCard(userId: number, cardId: number) {
    const card = await this.dbService.card.findUnique({
      where: { id: cardId },
      include: { column: { include: { user: true } } },
    });
    if (!card) throw new NotFoundException();
    if (card.column.user.id !== userId) throw new ForbiddenException();

    return this.dbService.card.delete({ where: { id: cardId } });
  }
}

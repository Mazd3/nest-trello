import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { CreateColumnDto, UpdateColumnDto } from './columns.dto';

@Injectable()
export class ColumnsService {
  constructor(private dbService: DbService) {}

  async getColumnsByUserId(userId: number) {
    const columns = await this.dbService.column.findMany({
      where: { userId: userId },
      include: { cards: true },
    });
    if (!columns) throw new NotFoundException();

    return columns;
  }

  async getColumnById(id: number) {
    const column = await this.dbService.column.findUnique({
      where: { id },
      include: { cards: true },
    });
    if (!column) throw new NotFoundException();
    return column;
  }

  async createColumn(userId: number, createColumnDto: CreateColumnDto) {
    const column = await this.dbService.column.create({
      data: { ...createColumnDto, userId },
      include: { cards: true },
    });

    return column;
  }

  async updateColumn(
    userId: number,
    columnId: number,
    updateColumnDto: UpdateColumnDto,
  ) {
    const column = await this.dbService.column.findUnique({
      where: { id: columnId },
      include: { user: true },
    });
    if (!column) throw new NotFoundException();
    if (column.user.id !== userId) throw new ForbiddenException();

    return this.dbService.column.update({
      where: { id: columnId },
      data: updateColumnDto,
      include: { cards: true },
    });
  }

  async deleteColumn(userId: number, columnId: number) {
    const column = await this.dbService.column.findUnique({
      where: { id: columnId },
      include: { user: true },
    });
    if (!column) throw new NotFoundException();
    if (column.user.id !== userId) throw new ForbiddenException();

    return this.dbService.column.delete({
      where: { id: columnId },
      include: { cards: true },
    });
  }
}

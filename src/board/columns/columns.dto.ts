import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { CardDto } from '../cards/cards.dto';

export class ColumnDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  title: string;

  @ApiProperty()
  @Expose()
  userId: number;

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  updatedAt: Date;
}

export class ReadColumnDto extends ColumnDto {
  @ApiProperty({ type: [CardDto] })
  @Expose({ name: 'cards', toPlainOnly: false })
  @Type(() => CardDto)
  cards: CardDto[];
}

export class CreateColumnDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;
}

export class UpdateColumnDto extends PartialType(CreateColumnDto) {}

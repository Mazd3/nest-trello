import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { CommentDto } from '../comments/comments.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class CardDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  title: string;

  @ApiProperty()
  @Expose()
  text: string;

  @ApiProperty()
  @Expose()
  columnId: number;

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  updatedAt: Date;
}

export class ReadCardDto extends CardDto {
  @ApiProperty({ type: [CommentDto] })
  @Expose()
  @Type(() => CommentDto)
  comments: CommentDto[];
}

export class CreateCardDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  text: string;
}

export class UpdateCardDto extends PartialType(CreateCardDto) {}

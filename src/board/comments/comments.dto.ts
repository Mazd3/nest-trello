import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CommentDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  text: string;

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  updatedAt: Date;

  @ApiProperty()
  @Expose()
  cardId: number;
}

export class ReadCommentDto extends CommentDto {}

export class CreateCommentDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  text: string;
}

export class UpdateCommentDto extends PartialType(CreateCommentDto) {}

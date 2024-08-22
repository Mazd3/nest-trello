import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ReadCardDto, UpdateCardDto } from './cards.dto';
import { AuthInfo } from 'src/auth/auth-info.decorator';
import { CardsService } from './cards.service';
import { plainToInstance } from 'class-transformer';
import { CommentsService } from '../comments/comments.service';
import { CreateCommentDto, ReadCommentDto } from '../comments/comments.dto';

@ApiBearerAuth()
@ApiUnauthorizedResponse({
  example: { message: 'Unauthorized', statusCode: 401 },
})
@ApiNotFoundResponse({ example: { message: 'Not found', statusCode: 404 } })
@ApiTags('cards')
@Controller('cards')
export class CardsController {
  constructor(
    private cardsService: CardsService,
    private commentsService: CommentsService,
  ) {}

  @ApiOkResponse({ type: ReadCardDto })
  @Get(':id')
  async getCard(@Param('id', ParseIntPipe) id: number) {
    const card = await this.cardsService.getCardById(id);
    return plainToInstance(ReadCardDto, card);
  }

  @ApiForbiddenResponse({ example: { message: 'Forbidden', statusCode: 403 } })
  @ApiOkResponse({ type: ReadCardDto })
  @Patch(':id')
  async patchCard(
    @Param('id', ParseIntPipe) id: number,
    @AuthInfo() authInfo: AuthInfo,
    @Body() UpdateCardDto: UpdateCardDto,
  ) {
    const card = await this.cardsService.updateCard(
      authInfo.id,
      id,
      UpdateCardDto,
    );
    return plainToInstance(ReadCardDto, card);
  }

  @ApiForbiddenResponse({ example: { message: 'Forbidden', statusCode: 403 } })
  @ApiOkResponse({ type: ReadCardDto })
  @Delete(':id')
  async deleteCard(
    @Param('id', ParseIntPipe) id: number,
    @AuthInfo() authInfo: AuthInfo,
  ) {
    const card = await this.cardsService.deleteCard(authInfo.id, id);
    return plainToInstance(ReadCardDto, card);
  }

  @ApiOkResponse({ type: [ReadCommentDto] })
  @Get(':id/comments')
  async getComments(@Param('id', ParseIntPipe) id: number) {
    const comments = await this.commentsService.getCommentsByCardId(id);
    return plainToInstance(ReadCommentDto, comments);
  }

  @ApiForbiddenResponse({ example: { message: 'Forbidden', statusCode: 403 } })
  @ApiOkResponse({ type: ReadCommentDto })
  @Post(':id/comments')
  async createComment(
    @Param('id', ParseIntPipe) id: number,
    @AuthInfo() authInfo: AuthInfo,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    const comment = await this.commentsService.createComment(
      authInfo.id,
      id,
      createCommentDto,
    );
    return plainToInstance(ReadCommentDto, comment);
  }
}

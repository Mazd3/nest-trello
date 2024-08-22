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
import { ColumnsService } from './columns.service';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ReadColumnDto, CreateColumnDto } from './columns.dto';
import { AuthInfo } from 'src/auth/auth-info.decorator';
import { plainToInstance } from 'class-transformer';
import { CreateCardDto, ReadCardDto, UpdateCardDto } from '../cards/cards.dto';
import { CardsService } from '../cards/cards.service';

@ApiBearerAuth()
@ApiUnauthorizedResponse({
  example: { message: 'Unauthorized', statusCode: 401 },
})
@ApiNotFoundResponse({ example: { message: 'Not found', statusCode: 404 } })
@ApiTags('columns')
@Controller('columns')
export class ColumnsController {
  constructor(
    private columnsService: ColumnsService,
    private cardsService: CardsService,
  ) {}

  @ApiOkResponse({ type: [ReadColumnDto] })
  @Get()
  async getColumns(@AuthInfo() authInfo: AuthInfo) {
    const columns = await this.columnsService.getColumnsByUserId(authInfo.id);
    return plainToInstance(ReadColumnDto, columns);
  }

  @ApiForbiddenResponse({ example: { message: 'Forbidden', statusCode: 403 } })
  @ApiOkResponse({ type: ReadColumnDto })
  @Post()
  async createColumn(
    @Body() createColumnDto: CreateColumnDto,
    @AuthInfo() authInfo: AuthInfo,
  ) {
    const column = await this.columnsService.createColumn(
      authInfo.id,
      createColumnDto,
    );
    return plainToInstance(ReadColumnDto, column);
  }

  @ApiOkResponse({ type: ReadColumnDto })
  @Get(':id')
  async getColumnById(@Param('id', ParseIntPipe) id: number) {
    const column = await this.columnsService.getColumnById(id);
    return plainToInstance(ReadColumnDto, column);
  }

  @ApiForbiddenResponse({ example: { message: 'Forbidden', statusCode: 403 } })
  @ApiOkResponse({ type: ReadColumnDto })
  @Patch(':id')
  async patchUpdateColumn(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCardDto: UpdateCardDto,
    @AuthInfo() authInfo: AuthInfo,
  ) {
    const column = await this.columnsService.updateColumn(
      authInfo.id,
      id,
      updateCardDto,
    );
    return plainToInstance(ReadColumnDto, column);
  }

  @ApiForbiddenResponse({ example: { message: 'Forbidden', statusCode: 403 } })
  @ApiOkResponse({ type: ReadColumnDto })
  @Delete(':id')
  async deleteColumn(
    @Param('id', ParseIntPipe) id: number,
    @AuthInfo() authInfo: AuthInfo,
  ) {
    const column = await this.columnsService.deleteColumn(authInfo.id, id);
    return plainToInstance(ReadColumnDto, column);
  }

  @ApiOkResponse({ type: [ReadCardDto] })
  @Get(':id/cards')
  async getCardsByColumnId(@Param('id', ParseIntPipe) id: number) {
    const cards = await this.cardsService.getCardsByColumnId(id);
    return plainToInstance(ReadCardDto, cards);
  }

  @ApiForbiddenResponse({ example: { message: 'Forbidden', statusCode: 403 } })
  @ApiOkResponse({ type: ReadColumnDto })
  @Post(':id/cards')
  async createCard(
    @Param('id', ParseIntPipe) id: number,
    @AuthInfo() authInfo: AuthInfo,
    @Body() createCardDto: CreateCardDto,
  ) {
    const card = await this.cardsService.createCard(
      authInfo.id,
      id,
      createCardDto,
    );
    return plainToInstance(ReadCardDto, card);
  }
}

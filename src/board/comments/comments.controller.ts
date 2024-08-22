import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CommentsService } from './comments.service';
import { plainToInstance } from 'class-transformer';
import { ReadCommentDto, UpdateCommentDto } from './comments.dto';
import { AuthInfo } from 'src/auth/auth-info.decorator';

@ApiBearerAuth()
@ApiUnauthorizedResponse({
  example: { message: 'Unauthorized', statusCode: 401 },
})
@ApiNotFoundResponse({ example: { message: 'Not found', statusCode: 404 } })
@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @ApiOkResponse({ type: ReadCommentDto })
  @Get(':id')
  async getComment(@Param('id', ParseIntPipe) id: number) {
    const comment = await this.commentsService.getCommentById(id);
    return plainToInstance(ReadCommentDto, comment);
  }

  @ApiForbiddenResponse({ example: { message: 'Forbidden', statusCode: 403 } })
  @ApiOkResponse({ type: ReadCommentDto })
  @Patch(':id')
  async patchComment(
    @Param('id', ParseIntPipe) commentId: number,
    @AuthInfo() authInfo: AuthInfo,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    const comment = await this.commentsService.updateComment(
      authInfo.id,
      commentId,
      updateCommentDto,
    );
    return plainToInstance(ReadCommentDto, comment);
  }

  @ApiForbiddenResponse({ example: { message: 'Forbidden', statusCode: 403 } })
  @ApiOkResponse({ type: ReadCommentDto })
  @Delete(':id')
  async deleteComment(
    @Param('id', ParseIntPipe) commentId: number,
    @AuthInfo() authInfo: AuthInfo,
  ) {
    const comment = await this.commentsService.deleteComment(
      authInfo.id,
      commentId,
    );
    return plainToInstance(ReadCommentDto, comment);
  }
}

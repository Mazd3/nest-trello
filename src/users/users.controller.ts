import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ReadUserDto, UpdateUserDto } from './users.dto';
import { plainToInstance } from 'class-transformer';
import { AuthInfo } from 'src/auth/auth-info.decorator';
import { ColumnsService } from 'src/board/columns/columns.service';
import { ReadColumnDto } from 'src/board/columns/columns.dto';

@ApiBearerAuth()
@ApiTags('users')
@ApiUnauthorizedResponse({
  schema: { example: { message: 'Unauthorized', statusCode: 401 } },
})
@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private columnsService: ColumnsService,
  ) {}

  @ApiOkResponse({ type: [ReadUserDto] })
  @Get()
  async getUsers() {
    const users = await this.usersService.getAllUsers();
    return plainToInstance(ReadUserDto, users);
  }

  @ApiNotFoundResponse({ example: { message: 'Not found', statusCode: 404 } })
  @ApiOkResponse({ type: ReadUserDto })
  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.getUserById(id);
    return plainToInstance(ReadUserDto, user);
  }

  @ApiNotFoundResponse({ example: { message: 'Not found', statusCode: 404 } })
  @ApiForbiddenResponse({
    schema: { example: { message: 'Forbidden', statusCode: 403 } },
  })
  @ApiOkResponse({ type: ReadUserDto })
  @Patch(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @AuthInfo() authInfo: AuthInfo,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = await this.usersService.updateUser(
      authInfo.id,
      id,
      updateUserDto,
    );
    return plainToInstance(ReadUserDto, user);
  }

  @ApiOkResponse({ type: ReadUserDto })
  @ApiNotFoundResponse({ example: { message: 'Not found', statusCode: 404 } })
  @ApiForbiddenResponse({
    schema: { example: { message: 'Forbidden', statusCode: 403 } },
  })
  @Delete(':id')
  async deleteUser(
    @Param('id', ParseIntPipe) id: number,
    @AuthInfo() authInfo: AuthInfo,
  ) {
    const user = await this.usersService.deleteUserById(authInfo.id, id);
    return plainToInstance(ReadUserDto, user);
  }

  @ApiNotFoundResponse({ example: { message: 'Not found', statusCode: 404 } })
  @ApiOkResponse({ type: [ReadColumnDto] })
  @Get(':id/columns')
  async getColumnsByUserId(@Param('id', ParseIntPipe) id: number) {
    const columns = await this.columnsService.getColumnsByUserId(id);
    return plainToInstance(ReadColumnDto, columns);
  }
}

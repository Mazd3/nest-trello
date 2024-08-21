import {
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserResponseDto } from './users.dto';
import { plainToInstance } from 'class-transformer';
import { AuthInfo } from 'src/auth/auth-info.decorator';

@ApiBearerAuth()
@ApiTags('users')
@ApiUnauthorizedResponse({
  schema: { example: { message: 'Unauthorized', statusCode: 401 } },
})
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @ApiOkResponse({ type: [UserResponseDto] })
  async getUsers() {
    const users = await this.usersService.getAllUsers();
    return plainToInstance(UserResponseDto, users);
  }

  @Get(':id')
  @ApiOkResponse({ type: UserResponseDto })
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.getUserById(id);
    return plainToInstance(UserResponseDto, user);
  }

  @Delete(':id')
  @ApiOkResponse({ type: UserResponseDto })
  @ApiForbiddenResponse({
    schema: { example: { message: 'Forbidden', statusCode: 403 } },
  })
  async deleteUser(
    @Param('id', ParseIntPipe) id: number,
    @AuthInfo() authInfo: AuthInfo,
  ) {
    if (id !== authInfo.id) throw new ForbiddenException();
    const user = await this.usersService.deleteUserById(id);
    return plainToInstance(UserResponseDto, user);
  }
}

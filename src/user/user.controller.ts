import { UserService } from './user.service';
import {
  Controller,
  Get,
  Patch,
  Body,
  UseGuards,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '@/auth/decorator';
import { JwtGuard } from '@/auth/guard';
import { EditUserDto } from './dto';
import {
  SwaggerEditUser,
  SwaggerGetMe,
} from './swagger';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private UserService: UserService) {}
  @Get('me')
  @SwaggerGetMe()
  async getMe(@GetUser() user: User) {
    try {
      if (!user) {
        throw new HttpException(
          'User not found.',
          HttpStatus.NOT_FOUND,
        );
      }

      if (user.id !== user.id) {
        throw new HttpException(
          'You are not authorized to access this information.',
          HttpStatus.FORBIDDEN,
        );
      }

      return {
        statusCode: HttpStatus.OK,
        message:
          'User data retrieved successfully.',
        data: user,
      };
    } catch {
      throw new HttpException(
        {
          statusCode:
            HttpStatus.INTERNAL_SERVER_ERROR,
          message:
            'Something went wrong, please try again later.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  } /* end get me */

  @Patch()
  @SwaggerEditUser()
  editUser(
    @GetUser('id') userId: number,
    @Body() dto: EditUserDto,
  ) {
    return this.UserService.editUser(userId, dto);
  }
}

import { PrismaService } from '@/prisma/prisma.service';
import {
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { EditUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async editUser(
    userId: number,
    dto: EditUserDto,
  ) {
    try {
      const user = await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          ...dto,
        },
      });

      delete user.hash;

      return user;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new HttpException(
          {
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'Email already exists.',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
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
  }
}

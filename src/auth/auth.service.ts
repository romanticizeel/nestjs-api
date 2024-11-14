import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  HttpStatus,
} from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async signup(dto: AuthDto) {
    // generate the password hash
    const hash = await argon.hash(dto.password);

    // save the new user in the db
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });

      // return the saved user
      return {
        statusCode: HttpStatus.CREATED,
        message: 'User signed up successfully',
        data: await this.signToken(
          user.id,
          user.email,
        ),
      };
    } catch (error) {
      if (
        error instanceof
        PrismaClientKnownRequestError
      ) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            'Credentials taken',
          );
        }
      }

      throw error;
    }
  }

  async signin(dto: AuthDto) {
    try {
      // find the user by email
      const user =
        await this.prisma.user.findUnique({
          where: {
            email: dto.email,
          },
        });

      // if the user does not exist throw an exception
      if (!user)
        throw new ForbiddenException(
          'Credentials incorrect',
        );

      // compare passoword
      const pwMatches = await argon.verify(
        user.hash,
        dto.password,
      );

      // if password is incorrect throw an exception
      if (!pwMatches)
        throw new ForbiddenException(
          'Creadentials incorrect',
        );

      // send back the user
      return {
        statusCode: HttpStatus.OK,
        message: 'User signed in successfully',
        data: await this.signToken(
          user.id,
          user.email,
        ),
      };
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'Something went wrong, please try again later.',
      );
    }
  }

  async googleLogin(req) {
    if (!req.user) {
      return { message: 'No user from Google' };
    }

    // Extract user data from Google profile
    const {
      email,
      firstName,
      lastName,
      picture,
    } = req.user;

    // Check if user exists in the database
    let user = await this.prisma.user.findUnique({
      where: { email },
    });

    // If the user does not exist, create a new record
    if (!user) {
      user = await this.prisma.user.create({
        data: {
          email,
          firstName,
          lastName,
          picture,
        },
      });
    } else {
      // Optionally update user if picture is not saved yet
      user = await this.prisma.user.update({
        where: { email },
        data: {
          picture: picture || user.picture,
        },
      });
    }

    // Issue JWT token with signToken function
    const { access_token } = await this.signToken(
      user.id,
      user.email,
    );

    return {
      message:
        'Google authentication successful. User has been signed in.',
      accessToken: access_token,
    };
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(
      payload,
      {
        expiresIn: '1d',
        secret: secret,
      },
    );

    return {
      access_token: token,
    };
  }
}

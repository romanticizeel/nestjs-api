import { applyDecorators } from '@nestjs/common';
import {
  ApiTags,
  ApiResponse,
  ApiBody,
  ApiOperation,
} from '@nestjs/swagger';
import { AuthDto } from '../dto';
import {
  SigninResponseExample,
  SignupResponseExample,
} from './response.examples';

export function SwaggerSignup() {
  return applyDecorators(
    ApiTags('Auth'),
    ApiOperation({
      summary: 'User Signup',
      description:
        'This endpoint allows a new user to create an account by providing necessary registration details.',
    }),
    ApiResponse({
      status: 201,
      description:
        'The record has been successfully created.',
      schema: {
        example: SignupResponseExample,
      },
    }),
    ApiResponse({
      status: 403,
      description: 'The credentials are taken.',
    }),
    ApiResponse({
      status: 400,
      description:
        'Some required fields are missing or invalid.',
    }),
    ApiResponse({
      status: 500,
      description:
        'Something went wrong, please try again later.',
    }),
    ApiBody({
      type: AuthDto,
      description:
        'JSON structure for signup object',
    }),
  );
}

export function SwaggerSignin() {
  return applyDecorators(
    ApiTags('Auth'),
    ApiOperation({
      summary: 'User Sign-in',
      description:
        'This endpoint allows an existing user to authenticate by providing their login credentials.',
    }),
    ApiResponse({
      status: 200,
      description: 'User signed in successfully',
      schema: {
        example: SigninResponseExample,
      },
    }),
    ApiResponse({
      status: 403,
      description: "The credentials don't match.",
    }),
    ApiResponse({
      status: 400,
      description:
        'Some required fields are missing or invalid.',
    }),
    ApiResponse({
      status: 500,
      description:
        'Something went wrong, please try again later.',
    }),
    ApiBody({
      type: AuthDto,
      description:
        'JSON structure for sign-in object',
    }),
  );
}
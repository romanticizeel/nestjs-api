import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
  ApiBody,
} from '@nestjs/swagger';
import {
  EditUserResponseExample,
  GetUserResponseExample,
} from './response.examples';
import { EditUserDto } from '../dto/edit-user.dto';

export function SwaggerGetMe() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Get current user information',
      description:
        'This endpoint retrieves the details of the currently authenticated user.',
    }),
    ApiResponse({
      status: 200,
      description:
        'Successfully retrieved current user information.',
      schema: {
        example: GetUserResponseExample,
      },
    }),
    ApiResponse({
      status: 401,
      description:
        'Unauthorized: Invalid or missing authentication token.',
    }),
    ApiResponse({
      status: 500,
      description:
        'An unexpected error occurred. Please try again later.',
    }),
  );
}

export function SwaggerEditUser() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Edit User Profile',
      description:
        'This endpoint allows the authenticated user to update their profile information, including email, password, first name, and last name.',
    }),
    ApiResponse({
      status: 200,
      description:
        'User profile updated successfully.',
      schema: {
        example: EditUserResponseExample,
      },
    }),
    ApiResponse({
      status: 400,
      description: 'Email already exists.',
    }),
    ApiResponse({
      status: 500,
      description:
        'Something went wrong, please try again later.',
    }),
    ApiBody({
      type: EditUserDto,
      description:
        'Json structure for edit user object',
    }),
  );
}

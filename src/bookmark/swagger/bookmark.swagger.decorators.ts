import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
  ApiBody,
} from '@nestjs/swagger';
import {
  CreateBookmakrResponseExample,
  EditBookmarkResponseExample,
  GetBookmarkByIdResponseExample,
  GetBookmarksResponseExample,
} from './response.examples';
import {
  CreateBookmarkDto,
  EditBookmarkDto,
} from '../dto';

export function SwaggerGetBookmarks() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Retrieve user bookmarks',
      description:
        'This endpoint retrieves a list of bookmarks saved by the currently authenticated user.',
    }),
    ApiResponse({
      status: 200,
      description:
        'Successfully retrieved current user bookmarks.',
      schema: {
        example: GetBookmarksResponseExample,
      },
    }),
    ApiResponse({
      status: 401,
      description:
        'Forbidden. You are not authorized to access this resource.',
    }),
    ApiResponse({
      status: 500,
      description:
        'An unexpected error occurred while fetching data. Please try again later.',
    }),
  );
}

export function SwaggerGetBookmarkById() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Retrieve user bookmark by id',
      description:
        'This endpoint retrieves a detail bookmark information that saved by the currently authenticated user.',
    }),
    ApiResponse({
      status: 200,
      description:
        'Successfully retrieved current user bookmark.',
      schema: {
        example: GetBookmarkByIdResponseExample,
      },
    }),
    ApiResponse({
      status: 401,
      description:
        'Forbidden. You are not authorized to access this resource.',
    }),
    ApiResponse({
      status: 500,
      description:
        'An unexpected error occurred while fetching data. Please try again later.',
    }),
  );
}

export function SwaggerCreateBookmark() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Create a new bookmark',
      description:
        'This endpoint allows the currently authenticated user to create a new bookmark and save it.',
    }),
    ApiResponse({
      status: 201,
      description:
        'The record has been successfully updated.',
      schema: {
        example: CreateBookmakrResponseExample,
      },
    }),
    ApiResponse({
      status: 500,
      description:
        'Something went wrong, please try again later.',
    }),
    ApiBody({
      type: CreateBookmarkDto,
      description:
        'Json structure for create bookmark object',
    }),
  );
}

export function SwaggerEditBookmark() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Edit Bookmark',
      description:
        'This endpoint allows the authenticated user to update an existing bookmark with new details such as title, URL, and description.',
    }),
    ApiResponse({
      status: 200,
      description:
        'The bookmark has been successfully updated.',
      schema: {
        example: EditBookmarkResponseExample,
      },
    }),
    ApiResponse({
      status: 400,
      description: 'Invalid request data.',
    }),
    ApiResponse({
      status: 500,
      description:
        'Something went wrong, please try again later.',
    }),
    ApiBody({
      type: EditBookmarkDto,
      description:
        'JSON structure for updating a bookmark object',
    }),
  );
}

export function SwaggerDeleteBookmark() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Delete Bookmark',
      description:
        'This endpoint allows the authenticated user to delete an existing bookmark by its ID.',
    }),
    ApiResponse({
      status: 200,
      description:
        'The bookmark has been successfully deleted.',
    }),
    ApiResponse({
      status: 404,
      description: 'Bookmark not found.',
    }),
    ApiResponse({
      status: 500,
      description:
        'Something went wrong, please try again later.',
    }),
  );
}

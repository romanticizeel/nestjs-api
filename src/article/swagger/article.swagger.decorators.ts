import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
  ApiBody,
} from '@nestjs/swagger';
import {
  CreateArticleResponseExample,
  EditArticleResponseExample,
  GetArticleByIdResponseExample,
  GetArticlesResponseExample,
} from './response.examples';
import {
  CreateArticleDto,
  EditArticleDto,
} from '../dto';

export function SwaggerGetArticles() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Retrieve user articles',
      description:
        'This endpoint retrieves a list of articles saved by the currently authenticated user.',
    }),
    ApiResponse({
      status: 200,
      description:
        'Successfully retrieved current user articles.',
      schema: {
        example: GetArticlesResponseExample,
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

export function SwaggerGetArticleById() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Retrieve user article by id',
      description:
        'This endpoint retrieves a detail article information that saved by the currently authenticated user.',
    }),
    ApiResponse({
      status: 200,
      description:
        'Successfully retrieved current user article.',
      schema: {
        example: GetArticleByIdResponseExample,
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

export function SwaggerCreateArticle() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Create a new article',
      description:
        'This endpoint allows the currently authenticated user to create a new article and save it.',
    }),
    ApiResponse({
      status: 201,
      description:
        'The record has been successfully updated.',
      schema: {
        example: CreateArticleResponseExample,
      },
    }),
    ApiResponse({
      status: 500,
      description:
        'Something went wrong, please try again later.',
    }),
    ApiBody({
      type: CreateArticleDto,
      description:
        'Json structure for create article object',
    }),
  );
}

export function SwaggerEditArticle() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Edit article',
      description:
        'This endpoint allows the authenticated user to update an existing article with new details such as title, URL, and description.',
    }),
    ApiResponse({
      status: 200,
      description:
        'The article has been successfully updated.',
      schema: {
        example: EditArticleResponseExample,
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
      type: EditArticleDto,
      description:
        'JSON structure for updating a article object',
    }),
  );
}

export function SwaggerDeleteArticle() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Delete article',
      description:
        'This endpoint allows the authenticated user to delete an existing article by its ID.',
    }),
    ApiResponse({
      status: 200,
      description:
        'The article has been successfully deleted.',
    }),
    ApiResponse({
      status: 404,
      description: 'Article not found.',
    }),
    ApiResponse({
      status: 500,
      description:
        'Something went wrong, please try again later.',
    }),
  );
}

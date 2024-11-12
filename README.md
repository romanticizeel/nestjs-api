# **Modular API Project**

This project is a collection of modular function APIs built using the NestJS framework. The API is designed to simplify development and management of applications using a modular approach.

## **Tech Stack**

- NestJS (`@nestjs/common`: ^10.0.0, `@nestjs/core`: ^10.0.0, `@nestjs/jwt`: ^10.2.0, `@nestjs/passport`: ^10.0.3, `@nestjs/platform-express`: ^10.0.0) as the primary framework
- TypeScript (`typescript`: ^5.1.3) as the programming language
- Prisma (`@prisma/client`: ^5.22.0) as the ORM for database management
- Argon2 (`argon2`: ^0.41.1) for password hashing
- Class Transformer (`class-transformer`: ^0.5.1) and Class Validator (`class-validator`: ^0.14.1) for data transformation and validation
- Passport (`passport`: ^0.7.0) and Passport JWT (`passport-jwt`: ^4.0.1) for authentication
- Pactum (`pactum`: ^3.7.3) and Supertest (`supertest`: ^7.0.0) for API testing
- Docker for container management

## **Running the Project**

To run this project, make sure you have Docker installed on your computer. Then, run the following commands:

- `npm run start:dev` to run the API in development mode
- `npm run test:e2e` to run end-to-end testing of the API

## **Docker Requirements**

This project uses Docker for container management. Make sure you have Docker installed on your computer before running this project.

## **Contributions**

If you'd like to contribute to this project, feel free to fork this repository and submit a pull request with your changes.

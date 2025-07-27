import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import fs from 'fs/promises';
import 'dotenv/config';
import { join } from 'path';
import * as express from 'express';
import redoc from 'redoc-express';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule, { logger: console });
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use('/public', express.static(join(__dirname, '..', 'assets')));

  const config = new DocumentBuilder()
    .setTitle('API ALVO-CERTO')
    .setDescription('Sistema de integração de APIs')
    .setVersion('0.1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Entre com o token JWT',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();
  const documentFactory = SwaggerModule.createDocument(app, config);
  await fs.writeFile('src/swagger.json', JSON.stringify(documentFactory));
  SwaggerModule.setup('swagger', app, documentFactory, {
    jsonDocumentUrl: 'api/json',
    yamlDocumentUrl: 'api/yaml',
    explorer: true,
    customSiteTitle: 'Minha Incrível Documentação da API',
    swaggerOptions: {
      docExpansion: 'none',
      filter: true,
      showRequestDuration: true,
      persistAuthorization: true,
      syntaxHighlight: {
        theme: 'arta',
      },
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
    customCssUrl: '/public/swagger-custom.css',
  });
  app.enableCors();
  app.use('/documentacao', (req, res) => {
    // Gera o json
    res.send(documentFactory);
  });
  app.use(
    '/api', // Endpoint para acessar a documentação Redoc
    redoc({
      title: 'Documentação da Minha API',
      specUrl: '/documentacao', // URL onde o JSON OpenAPI está disponível
      redocOptions: {
        theme: { colors: { primary: { main: '#607d8b' } } },
        hideDownloadButton: false,
        hideHostname: false,
      },
    }),
  );
  await app.listen(process.env.PORT || 3000);
}
bootstrap();

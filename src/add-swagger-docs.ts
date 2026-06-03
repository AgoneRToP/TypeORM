import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import expressBasicAuth from 'express-basic-auth';

export function addSwaggerDocs(app: INestApplication) {
  app.use(
    ['./api'],
    expressBasicAuth({
      challenge: true,
      users: {
        test: '1111',
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('User-ost project')
    .setDescription('The user-post API description')
    .setVersion('1.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, documentFactory);
}

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // CORS configuration
  app.enableCors({
    origin: [
      "http://localhost:3000",              // local frontend
      "http://localhost:3001",
      "https://hms-beta-sandy.vercel.app",  // your deployed frontend
      /\.vercel\.app$/                      // allow all vercel previews
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  });

  // Global API prefix (optional but recommended)
  // app.setGlobalPrefix('api');

  const port = process.env.PORT || 4000;

  await app.listen(port);

  console.log(`🚀 HMS API running on port ${port}`);
}

bootstrap();
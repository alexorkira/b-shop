import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    })
  );

  app.enableCors({
    origin: `${process.env.REACT_HOST}:${process.env.FRONTEND_PORT}`,
  });

  await app.listen(process.env.REACT_BACKEND_PORT);
}
bootstrap();

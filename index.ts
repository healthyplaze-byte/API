import { NestFactory } from "@nestjs/core";
import { AppModule } from "../src/app.module";

let cachedServer;

export default async function handler(req, res) {
  if (!cachedServer) {
    const app = await NestFactory.create(AppModule);
    await app.init();
    cachedServer = app.getHttpAdapter().getInstance();
  }

  return cachedServer(req, res);
}
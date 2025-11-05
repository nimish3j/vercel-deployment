import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import express from 'express';
import serverless from 'serverless-http';
import type { VercelRequest, VercelResponse } from '@vercel/node';

// Import from compiled dist folder
let AppModule: any;
try {
  AppModule = require('../dist/src/app.module').AppModule;
} catch (e) {
  // Fallback to source if dist doesn't exist (development)
  AppModule = require('../src/app.module').AppModule;
}

// Cache the serverless handler to reuse across invocations
let cachedHandler: any = null;

async function bootstrap() {
  if (cachedHandler) {
    return cachedHandler;
  }

  // Create Express app
  const expressApp = express();
  const adapter = new ExpressAdapter(expressApp);

  // Create NestJS app with Express adapter
  const app = await NestFactory.create(AppModule, adapter, {
    logger: false,
  });

  // Global validation pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // CORS configuration
  app.enableCors({
    origin: process.env.FRONTEND_URL || '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Initialize NestJS app
  await app.init();

  // Wrap Express app with serverless-http for Vercel compatibility
  cachedHandler = serverless(expressApp, {
    binary: ['image/*', 'application/pdf'],
  });

  return cachedHandler;
}

// Vercel serverless function handler
export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
): Promise<any> {
  const serverlessHandler = await bootstrap();
  return serverlessHandler(req, res);
}


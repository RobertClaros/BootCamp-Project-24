// secretRoutes.ts

import express, { Router, Request, Response } from 'express';
import { generateSecretKey } from '../helpers';

export function createSecretRouter(): Router {
  const router = express.Router();

  const secrets: { [key: string]: string } = {};

  router.post('/api/secrets', (req: Request, res: Response) => {
    const { message } = req.body;
    const secretKey = generateSecretKey();
    secrets[secretKey] = message;
    res.status(200).json({ secretKey });
  });

  router.get('/api/secret/:secretKey', (req: Request, res: Response) => {
    const { secretKey } = req.params;
    const secretMessage = secrets[secretKey];
    if (secretMessage) {
      delete secrets[secretKey];
      res.json({ secretMessage });
    } else {
      res.status(404).json({ error: 'Secret not found' });
    }
  });

  return router;
}

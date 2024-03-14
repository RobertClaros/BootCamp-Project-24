import express from 'express';
import { createSecretRouter } from './routes/secretRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(createSecretRouter());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;

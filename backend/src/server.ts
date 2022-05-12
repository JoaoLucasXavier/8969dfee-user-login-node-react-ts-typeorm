import express from 'express';
import cors from 'cors';
import { router } from './routes';
import dbConnection from './database/connection';

async function startup() {
  await dbConnection();
  const app = express();

  const allowedOrigins = ['http://localhost:3000'];
  const options: cors.CorsOptions = {
    origin: allowedOrigins,
  };

  app.use(cors(options));

  app.use(express.json());
  app.use(router);

  app.get('/', (req, res) => {
    res.send('User Login');
  });

  const port = 3001;
  app.listen(port, () => {
    console.log(`Running on port ${port}`);
  });
}

startup();

// index.js
import express from 'express';
import { CreateUserRouter } from './routers/UserRouter.js';
import { CreateAuthRouter } from './routers/AuthRouter.js';
import db from './models/index.js'; 

const app = express();
app.use(express.json());


app.use('/api/v1/users', CreateUserRouter({ dbModels: db }));
app.use('/api/v1/auth', CreateAuthRouter({ dbModels : db }));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});

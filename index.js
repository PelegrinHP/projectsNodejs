import express, { json } from 'express';
import { CreateUserRouter } from './routers/UserRouter.js';
//import bodyParser from 'body-parser';
//import { User } from './models/index.js'; // Ahora puedes usar directamente la clase

const app = express();
//app.use('x-powered-by');
app.use(express.json()); 

// Crear una instancia de los Modelos
//const usersModels = new User(); // Funciona correctamente
//app.use(bodyParser.json());
app.use('/api/v1/users', CreateUserRouter({ }));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);

});
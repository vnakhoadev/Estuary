import express from 'express';
import cors from 'cors';
import "reflect-metadata";
import { AppDataSource } from "./data-source/data-source";
import routes from './routes';


const app = express();
const port = 3000;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(cors());

(async () => {
  await AppDataSource.initialize()
    .then(() => {
      console.log("Data Source has been connected successfully!");
    })
    .catch((error) => {
      console.error("Error disconnected:", error);
    })
})();

app.use('/api', routes);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
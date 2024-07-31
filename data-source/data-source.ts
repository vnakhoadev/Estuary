import { DataSource } from "typeorm";
import { Post } from "../database/entity/Post.entity";
import { Comment } from "../database/entity/Comment.entity";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "testuser",
  password: "",
  database: "estuary",
  synchronize: true,
  logging: true,
  entities: [Post, Comment],
  subscribers: [],
  migrations: [],
})
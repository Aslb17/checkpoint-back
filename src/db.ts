import { DataSource } from "typeorm";
import { env } from "./env";

export default new DataSource({
  type: "sqlite",
  database: "sqlite",
  synchronize: true,
  entities: [],
  logging: ["error"],
});

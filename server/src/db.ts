import { DataSource } from "typeorm";
import Country from "./entity/Country";

const db = new DataSource({
  type: "sqlite",
  database: "sqlite",
  synchronize: true,
  entities: [Country],
  logging: ["error"],
});

export default db;
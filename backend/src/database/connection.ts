import "reflect-metadata";
import { createConnection } from "typeorm";

const dbConnection = () => {
  createConnection()
    .then(() => console.log("✅ Successfully connected with database"))
    .catch((err) => console.log(`❌ Error: ${err}`));
};

export default dbConnection;

import Event from "./entity/Event";
import SurveyQuestion from "./entity/SurveyQuestion";
import SurveyResult from "./entity/SurveyResult";

import {
  ConnectionManager,
  ConnectionOptions,
  getManager,
  getRepository
} from "typeorm";
const connectionManager = new ConnectionManager();
const ormConfig: ConnectionOptions = {
  type: "postgres",
  host: process.env.PGHOST,
  port: 5432,
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  entities: [Event, SurveyQuestion, SurveyResult],
  synchronize: true,
  logging: false
};

console.log(JSON.stringify(ormConfig, null, 4));

class ConnectDB {
  constructor() {
    console.log("create constructor");
  }
  connect = async () => {
    const connection = connectionManager.create(ormConfig);
    return await connection.connect();
  };
  getRepository = (entityName: any) => {
    return getRepository(entityName);
  };
  getManager = () => {
    return getManager();
  };
}

export default new ConnectDB();

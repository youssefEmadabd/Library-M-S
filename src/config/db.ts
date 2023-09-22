import { Sequelize } from "sequelize"
import { config } from "./config"
import logger from "./logger";

const sequelize = new Sequelize(config.db.dbUrl)

const testDbConnection = async () => {
    try {
      await sequelize.authenticate();
      logger.info("Connection has been established successfully.");
    } catch (error) {
      logger.error("Unable to connect to the database:", error);
    }
  };

export default sequelize
export const db = { testDbConnection }
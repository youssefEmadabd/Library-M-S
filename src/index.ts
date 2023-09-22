import { config } from './config/config';
import logger from './/config/logger';
import {db} from './/config/db'
import app from './/app';

let server;

const exitHandler = (): void => {
  if (server)
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  else process.exit(1);
};

const unexpectedErrorHandler = (error: Error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) server.close();
});

db.testDbConnection();

app.listen(config.port, () => {
  logger.info(`Listening to port ${config.port}`);
});
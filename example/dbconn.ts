import { createConnection, Connection } from "typeorm";
import * as conn from "./config";

/**
 * Responsable for all database functions
 */
export let dbConnection: Connection;

/**
 * Creates connection to database
 */
export function connect(): Promise<void> {
  let log: boolean = true;

  // Only enable log if is development environment
  if (process.env.NODE_ENV !== "DEV") {
    log = false;
  }

  /**
   * synchronize — Indicates if database schema should be auto created on every application launch.
   * Be careful with this option and don’t use this in production — otherwise you can lose production data.
   * This option is useful during debug and development.
   */

  console.log(conn.dbConfig.username);
  return createConnection({
    type: "postgres",
    host: conn.dbConfig.host,
    port: Number.parseInt(conn.dbConfig.port),
    username: conn.dbConfig.username,
    password: conn.dbConfig.password,
    database: conn.dbConfig.database,
    synchronize: false,
    migrationsRun: true,
    logging: log,
    maxQueryExecutionTime: 20000,
    logger: "advanced-console",
    entities: ["./build/src/entity/**/*.js"],
    migrations: ["./build/src/migration/**/*.js"],
    subscribers: ["./build/src/subscriber/**/*.js"],
    cli: {
      migrationsDir: "./src/migration",
    },
  })
    .then((connection) => {
      dbConnection = connection;
      console.log("> Connected to " + connection.options.database);
      console.log("Running migrations...");

      return connection
        .runMigrations()
        .then((migrations) => {
          if (migrations) {
            const failMigrations = migrations
              .filter((migration) => migration.id === undefined)
              .map((migration) => migration.name);

            if (failMigrations && failMigrations.length > 0) {
              console.error("\n Migrations errors: " + failMigrations);
              return Promise.reject();
            }

            console.log("Finished migrations");

            if (migrations.length > 0) {
              console.log(migrations.map((migration) => migration.name));
            }

            return Promise.resolve();
          }

          console.log("Finished migrations");
          return Promise.resolve();
        })
        .catch(() => {
          return Promise.reject();
        });
    })
    .catch((error) => {
      if (error) {
        console.log(error);
      }

      return Promise.reject();
    });
}

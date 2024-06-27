// Update with your config settings.
import { config } from 'dotenv'
import configInv from "./src/config/keys";
config()
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const configOptions = {

  development: {
    client: 'mysql2',
    connection: {
      host: configInv.HOST,
      user: configInv.DATABASE_USER,
      port: +configInv.DATABASE_PORT,
      password: configInv.PASSWORD,
      database: configInv.DATABASE
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations'
    }
  },

  // staging: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // },

  // production: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // }

};
export default configOptions
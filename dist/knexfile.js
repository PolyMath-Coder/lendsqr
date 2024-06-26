"use strict";
// Update with your config settings.
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const config = {
    development: {
        client: 'mysql2',
        connection: {
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'lendsqr'
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
exports.default = config;
//# sourceMappingURL=knexfile.js.map
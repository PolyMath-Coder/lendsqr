import knex from "knex";

import knexConfig from '../../knexfile'

const configOptions = knexConfig['development']

export default knex(configOptions);
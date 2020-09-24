require('dotenv').config();

const user = process.env.NAME;
const password = process.env.PASSWORD;
const database = process.env.DATABASE;
const host = process.env.HOST;
const node_env = process.env.NODE_ENV;

const config = {
    dev: {
        db: {
            host,
            user,
            password,
            database,
            multipleStatements: true,
            timezone: "+06:00"
        }
    },
    test: {

    },
    prod: {

    }
};

module.exports = config[node_env];
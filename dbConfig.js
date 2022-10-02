require("dotenv").config();

const { Pool } = require("pg");

const isProduction = true;
// const connectionString= `postgressql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;
const devConnectionString = "postgres://test_dev:kotoba@localhost/image_test"; //`postgres://postgres:123123123@localhost:5432/nodelogin`;

console.log('sfsfd')
const pool = new Pool({
    connectionString: isProduction ? 'postgres://onvjuotq:ADpMvrk97ybLIUgw_uA6AM_LObaBTHal@heffalump.db.elephantsql.com/onvjuotq' : devConnectionString,

});

module.exports = { pool };
const pgp = require('pg-promise')({});
const localcn = 'postgres://localhost/eb_marketplace'
const db = pgp(process.env.DATABASE_URL || localcn);

module.exports =  {
    db,
}
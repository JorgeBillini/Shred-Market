const pgp = require('pg-promise')({});
const localcn = {
   host: 'localhost',
   port: 5432,
   database: 'eb_market',
   user: 'postgres',
   password: 'newPassword'
};
const db = pgp(process.env.DATABASE_URL || localcn);

module.exports =  {
    db,
}
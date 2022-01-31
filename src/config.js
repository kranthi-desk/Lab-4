const env = process.env;

const config = {
  db: { /* do not put password or any sensitive info here, done only for demo */
    host: env.host, 
    port: env.port, 
    user: env.username, 
    password: env.password ,
    database: env.dbname ,
  },
  listPerPage: env.LIST_PER_PAGE,
};

module.exports = config;
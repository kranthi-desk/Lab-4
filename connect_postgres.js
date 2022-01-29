require('dotenv').config({path:__dirname + '/lab4.env'})

PGHOST = process.env.host
PGUSER = process.env.username
PGDATABASE = process.env.dbname
PGPASSWORD = process.env.password
PGPORT = process.env.port


const { Client } = require('pg')
const client = new Client({
  user: PGUSER,
  host: PGHOST,
  database: PGDATABASE,
  password: PGPASSWORD,
  port: PGPORT,
})
client.connect()
.then(() => console.log("Connected!"))
.then(() => client.query("select * from team"))
.then(res => console.table(res.rows))
.catch(e => console.log(e))
.finally(() => client.end())


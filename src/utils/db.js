const mysql = require("mysql")

// const con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: `${process.env.DATABASE_NAME}`,
// })
const con = mysql.createConnection({
  host: `${process.env.DATABASE_HOST}`,
  port: `${process.env.DATABASE_PORT}`,
  user: `${process.env.DATABASE_USER}`,
  password: `${process.env.DATABASE_PASS}`,
  database: `${process.env.DATABASE_NAME}`
})

module.exports = con
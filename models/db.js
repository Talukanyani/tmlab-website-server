const mysql = require('mysql')
const dbConfig = require('../config/dbConfig')

const connection = mysql.createConnection(dbConfig)

const db = (sqlQuery, result) => {
    connection.query(sqlQuery, (error, info, field) => {
        if (error) {
            result(error, null, null)
            return
        }

        result(null, info, field)
    })
}

module.exports = db

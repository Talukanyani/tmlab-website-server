// Database for development
const devDB = {
    host: 'localhost',
    port: 3306,
    user: 'talu',
    password: 'taluSlocalDB@2022',
    database: 'tmlab',
}

// Database for production
const prodDB = {
    host: process.env.RDS_HOSTNAME,
    port: process.env.RDS_PORT,
    user: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    database: process.env.RDS_DB_NAME,
}

const dbConfig = {
    host: prodDB.host,
    port: prodDB.port,
    user: prodDB.user,
    password: prodDB.password,
    database: prodDB.database,
}

module.exports = dbConfig
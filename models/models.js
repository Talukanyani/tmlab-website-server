const db = require('./db')

const subscribe = (reqdetails, result) => {
    var sqlQuery = `INSERT INTO newsletter_emails (email) VALUES('${reqdetails.email}')`
    db(sqlQuery, result)
}

const unsubscribe = (reqdetails, result) => {
    var sqlQuery = `DELETE FROM newsletter_emails WHERE id = ${reqdetails.id} AND email = '${reqdetails.email}'`
    db(sqlQuery, result)
}

const emailSubmit = (reqdetails, result) => {
    var sqlQuery = `INSERT INTO sc_emails (email) VALUES('${reqdetails.email}')`
    db(sqlQuery, result)
}

const send = (reqdetails, result) => {
    var sqlQuery = `INSERT INTO new_messages (name, email, text) VALUES('${reqdetails.name}', '${reqdetails.email}', '${reqdetails.text}')`
    db(sqlQuery, result)
}

const checkEmailDuplication = (reqdetails, table, result) => {
    var sqlQuery = `SELECT id FROM ${table} WHERE email = '${reqdetails.email}'`
    db(sqlQuery, result)
}

module.exports = {
    subscribe,
    unsubscribe,
    emailSubmit,
    send,
    checkEmailDuplication
}

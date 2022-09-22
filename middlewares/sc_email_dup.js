const { checkEmailDuplication } = require('../models/models')

const checkEmailDup = (req, res, next) => {
    var reqdetails = req.body
    var table = 'sc_emails'

    checkEmailDuplication(reqdetails, table, (dbError, dbInfo) => {
        if (dbError) {
            res.sendStatus(500)
            return
        }

        if (dbInfo == 0) {
            next()
        } else {
            res.json({ "message": "already_submited" })
        }
    })
}

module.exports = checkEmailDup
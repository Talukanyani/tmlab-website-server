const { checkEmailDuplication } = require('../models/models')

const checkEmailDup = (req, res, next) => {
    var reqdetails = req.body
    var table = 'sc_emails'

    checkEmailDuplication(reqdetails, table, (dbError, dbInfo) => {
        if (dbError) {
            next(new Error(dbError))
            return
        }

        if (dbInfo == 0) {
            next()
        } else {
            res.json({
                "title": "Already Submitted",
                "message": "You have already submitted your email, we will email you when SC App is available to download."
            })
        }
    })
}

module.exports = checkEmailDup
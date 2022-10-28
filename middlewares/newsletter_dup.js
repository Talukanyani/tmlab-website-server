const { checkEmailDuplication } = require('../models/models')

const checkEmailDup = (req, res, next) => {
    var reqdetails = req.body
    var table = 'newsletter_emails'

    checkEmailDuplication(reqdetails, table, (dbError, dbInfo) => {
        if (dbError) {
            next(new Error(dbError))
            return
        }

        if (dbInfo == 0) {
            next()
        } else {
            res.json({
                "title": "Already Subscribed",
                "message": "You have already subscribed to our newsletter, we will keep you updated when neccessary."
            })
        }
    })
}

module.exports = checkEmailDup


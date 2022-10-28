const { checkEmailDuplication } = require('../models/models')

const checkEmailDup = (req, res, next) => {
    var reqdetails = req.body
    var table = 'new_messages'

    checkEmailDuplication(reqdetails, table, (dbError, dbInfo) => {
        if (dbError) {
            next(new Error(dbError))
            return
        }

        if (dbInfo == 0) {
            next()
        } else {
            res.json({
                "title": "Already Sent",
                "message": "We already received your message, wait until we respond to your message."
            })
        }
    })
}

module.exports = checkEmailDup
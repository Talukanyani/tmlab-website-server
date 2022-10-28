const express = require('express')

const { emailSubmit } = require('../models/models')
const { validateEmail } = require('../middlewares/validate')
const checkEmailDup = require('../middlewares/sc_email_dup')

const router = express.Router()

const onDevelopment = express().get('env') == 'development'

router.post('/', validateEmail, checkEmailDup, (req, res, next) => {
    var reqdetails = req.body

    emailSubmit(reqdetails, (dbError, dbInfo) => {
        if (dbError) {
            next(new Error(dbError))
            onDevelopment && console.log(dbError)
            return
        }

        res.json({
            "title": "Successfully Submitted",
            "message": "We have received your email, we will email you when SC App is available to download."
        })
        onDevelopment && console.log(dbInfo)
    })
})

module.exports = router
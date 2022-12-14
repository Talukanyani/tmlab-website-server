const express = require('express')

const { send } = require('../models/models')
const { sendEmail } = require('../middlewares/email')
const { validateMssg, validateEmail } = require('../middlewares/validate')
const checkEmailDup = require('../middlewares/contact_dup')

const router = express.Router()

const onDevelopment = express().get('env') == 'development'

const middlewares = [validateMssg, validateEmail, checkEmailDup]

router.post('/', middlewares, (req, res, next) => {
    var reqdetails = req.body
    var table = 'new_messages'

    send(reqdetails, table, (dbError, info) => {
        if (dbError) {
            next(new Error(dbError))
            onDevelopment && console.log(dbError)
            return
        }

        sendEmail('Tmlab Website', reqdetails)

        res.json({
            "type": "success",
            "title": "Successfully Sent",
            "message": `We have recevied your message, we will contact you back on ${req.body.email}`
        })

        onDevelopment && console.log(info)
    })
})

module.exports = router
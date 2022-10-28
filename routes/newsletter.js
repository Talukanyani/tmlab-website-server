const express = require('express')

const { subscribe, unsubscribe } = require('../models/models')
const { validateEmail } = require('../middlewares/validate')
const checkEmailDup = require('../middlewares/newsletter_dup')

const router = express.Router()

const onDevelopment = express().get('env') == 'development'

router.post('/', validateEmail, checkEmailDup, (req, res, next) => {
    var reqdetails = req.body

    subscribe(reqdetails, (dbError, dbInfo) => {
        if (dbError) {
            next(new Error(dbError))
            // onDevelopment && console.log(dbError)
            return
        }

        res.json({
            "title": "Successfully Subscribed",
            "message": "You have successfully subscribed to our newsletter, we will keep uptaded."
        })
        onDevelopment && console.log(dbInfo)
    })
})

router.delete('/', (req, res, next) => {
    var reqdetails = req.body

    unsubscribe(reqdetails, (dbError, dbInfo) => {
        if (dbError) {
            next(new Error(dbError))
            onDevelopment && console.log(dbError)
            return
        }

        if (dbInfo.affectedRows == 0) {
            res.sendStatus(404)
            onDevelopment && console.log(dbInfo)
            return
        }

        res.json({
            "message": "successfully_unsubscribed",
            "email": req.body.email
        })
        onDevelopment && console.log(dbInfo)
    })
})

module.exports = router

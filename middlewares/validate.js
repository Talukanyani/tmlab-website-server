const onDevelopment = process.env.NODE_ENV == 'development'

const validateEmail = (req, res, next) => {
    var emailRegEx = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,5})+$/
    var isValidEmail = emailRegEx.test(req.body.email)

    if (!isValidEmail) {
        res.sendStatus(500)
        onDevelopment && console.log('Invalid Email')
        return
    } else {
        next()
    }

}

const validateMssg = (req, res, next) => {
    var nameRegEx = /^[a-zA-Z]{2,20}(\s[a-zA-Z]{2,20})?$/
    var textRegEx = /^.{30,250}$/

    var isValidName = nameRegEx.test(req.body.name)
    var isValidText = textRegEx.test(req.body.text)

    if (!isValidName) {
        res.sendStatus(500)
        onDevelopment && console.log('Invalid Name')
        return
    }

    if (!isValidText) {
        res.sendStatus(500)
        onDevelopment && console.log('Invalid Text')
        return
    }

    next()
}

module.exports = {
    validateMssg,
    validateEmail
} 
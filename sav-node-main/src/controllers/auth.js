const md5 = require('md5');
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.register = async (req, res, next) => {
    const user = await prisma.user.create({
        data: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: md5(req.body.password)
        },
    });
    res.json((user))
}

exports.login = async (req, res, next) => {
    const user = await prisma.user.findFirst({
        where: {
            email: req.body.email,
            password: md5(req.body.password)
        },
    })
    if (user == null) {
        res.json({ "error": true, msg: "Email or password inccorect!", user: {} })
    } else {
        res.json({ "error": false, msg: "", user: user })
    }
}


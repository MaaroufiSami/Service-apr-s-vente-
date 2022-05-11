const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.createAvailableClient = async (req, res, next) => {
    const client = await prisma.available_client.create({
        data: {
            interventionId: req.body.id,
            shop: req.body.shop,
            isAvailable: req.body.isAvailable,
            callAt: req.body.callAt,
            pec: req.body.pec,
            comment: req.body.comment,
        }
    })
    res.json(client)
}
exports.getAvailableClient = async (req, res, next) => {
    const client = await prisma.available_client.findUnique({
        where: { interventionId: req.query.id }
    })
    res.json(client)
}
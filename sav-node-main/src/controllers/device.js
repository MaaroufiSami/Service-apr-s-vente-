const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.getDeviceByIMEI = async (req, res, next) => {
    const device = await prisma.device.findUnique({
        where: { imei: req.query.imei }
    });
    if (device == null) {
        res.json({ "error": true, msg: "not found device", device: {} })
    } else {

        res.json({ "error": false, msg: "", device: device })
    }
}
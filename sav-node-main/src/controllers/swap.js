const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getItemList = async (req, res, next) => {
  var result = await prisma.swap.findMany({
    where: { status: "pending" },
    select: {
      intervention: {
        select: {
          id: true,
          createdAt: true,
          device: {
            select: {
              brand: true,
              model: true,
              imei: true,
              batteryId: true,
            },
          },
        },
      },
    },
  });
  result = result.map((val) => {
    return {
      id: val.intervention.id,
      brand: val.intervention.device.brand,
      model: val.intervention.device.model,
      imei: val.intervention.device.imei,
      batteryId: val.intervention.device.batteryId,
      createdAt: val.intervention.createdAt,
    };
  });
  res.json(result);
};

exports.Swaped = async (req, res, next) => {
  await prisma.swap.updateMany({
    where: { interventionId: req.body.id },
    data: {
      status: "SWAPPED",
    },
  });
  await prisma.swap_status.create({
    data: {
      status: "SWAPPED",
      comment: "",
      intervention: { connect: { id: req.body.id } },
    },
  });

  const result = await prisma.intervention.findFirst({
    where: { id: req.body.id },
    select: {
      id: true,
      createdAt: true,
      panneType: true,
      description: true,
      client: true,
      device: true,
      Swap: true,
    },
  });

  res.json({ error: false, data: result });
};

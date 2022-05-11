const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getWaitingInter = async (req, res, next) => {
  const data =
    (await prisma.intervention_status.findMany({
      where: {
        obs: req.body.status,
        ispdfClosed: false,
      },
      select: {
        id: true,
        pdflink: true,
        obs: true,
        intervention: {
          select: {
            id: true,
            createdBy: true,
            client: {
              select: {
                phoneNumber1: true,
              },
            },
            available_client: true,
          },
        },
      },
    })) ?? [];

  result = [];
  data.map((val) => {
    result.push({
      id: val.intervention.id,
      statusId: val.id,
      status: val.obs,
      clientPhone: val.intervention.client.phoneNumber1,
      createdBy: val.intervention.createdBy,
      pdfLink: val.pdflink,
    });
  });
  res.json(result);
};

exports.updatedPDFStatus = async (req, res, next) => {
  const c =  await prisma.intervention_status.update({
    where: {id: req.body.statusId},
    data: {
      ispdfClosed: true,
    }
  })
  console.log(c)
  next();
};

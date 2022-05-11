const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createIntervention = async (req, res, next) => {
  const client = {
    cin: req.body.client.cin,
    firstName: req.body.client.firstName,
    lastName: req.body.client.lastName,
    phoneNumber1: req.body.client.phoneNumber1,
    phoneNumber2: req.body.client.phoneNumber2,
    email: req.body.client.email,
  };
  const intervention_status = {
    status: "En attente Envoi réparteur externe",
    obs: "En cours diagnostic",
    local: req.body.shop,
  };
  const intervention = await prisma.intervention.create({
    data: {
      panneType: req.body.Panne,
      accessories: req.body.Accessories,
      terminalPret: parseInt(req.body.terminal),
      description: req.body.description,
      workflow: req.body.workflow,
      status: "Ouverte",
      createdBy: req.body.shop,
      device: { connect: { imei: req.body.imei } },
      client: {
        connectOrCreate: {
          where: { cin: client.cin },
          create: client,
        },
      },
      intervention_status: { create: intervention_status },
    },
  });
  await prisma.device.update({
    where: { imei: req.body.imei },
    data: { nb_retour_sav: { increment: 1 } },
  });
  res.json(intervention);
};

exports.pendingIntervention = async (req, res, next) => {
  const intervention = await prisma.intervention.findMany({
    where: {
      dischargeId: null,
      workflow: req.body.workflow,
    },
    include: {
      device: true,
      intervention_status: {
        take: 1,
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
  if (intervention) return res.json(intervention);
  else res.json([]);
};

exports.returnIntervention = async (req, res, next) => {
  const intervention = await prisma.intervention.findMany({
    where: {
      dischargeId: { not: null },
      workflow: req.body.workflow,
      outStore: true,
    },
    include: {
      device: true,
      intervention_status: {
        take: 1,
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
  if (intervention) return res.json(intervention);
  else res.json([]);
};

exports.etatIntervention = async (req, res, next) => {
  let op = req.body.operation;
  var data = {
    outStore: req.body.outStore,
    intervention_status: {
      create: {
        obs: req.body.obs,
        status: req.body.status,
        local: req.body.shop,
        marque: op ? op.marque : null,
        modele: op ? op.modele : null,
        newIMEI: op ? op.newIMEI : null,
        ispdfClosed: req.body.ispdfClosed,
      },
    },
  };
  if (req.body.disch == true) {
    data.dischargeId = null;
  }
  await prisma.intervention.update({ where: { id: req.body.id }, data: data });
  return res.json({ error: false });
};

exports.searchIntervention = async (req, res, next) => {
  // console.log()
  const result = await prisma.intervention.findMany({
    where: req.body.option,
  });

  res.json(result);
};

exports.detailsIntervention = async (req, res, next) => {
  // console.log()
  const result = await prisma.intervention.findUnique({
    where: { id: parseInt(req.query.id) },
    select: {
      id: true,
      status: true,
      intervention_status: {
        orderBy: {
          createdAt: "desc",
        },
      },
      available_client: true,
    },
  });

  res.json({
    id: result.id,
    status: result.status,
    data: result.intervention_status,
    available_client: result.available_client,
  });
};

exports.closeIntervention = async (req, res, next) => {
  const data = await prisma.intervention.update({
    where: { id: req.body.id },
    data: {
      status: "Cloturée",
      intervention_status: {
        create: {
          status: "Cloturée",
          obs: req.body.obs,
          local: req.body.shop,
        },
      },
    },
    select: { intervention_status: { orderBy: { createdAt: "desc" } } },
  });

  res.json({ error: false, data: data.intervention_status });
};

exports.swapIntervention = async (req, res) => {
  const client = {
    cin: req.body.client.cin,
    firstName: req.body.client.firstName,
    lastName: req.body.client.lastName,
    phoneNumber1: req.body.client.phoneNumber1,
    phoneNumber2: req.body.client.phoneNumber2,
    email: req.body.client.email,
  };

  const intervention = await prisma.intervention.create({
    data: {
      panneType: req.body.Panne,
      accessories: "",
      terminalPret: 0,
      description: req.body.description,
      workflow: "TerminalMobile",
      status: "Cloturée",
      device: { connect: { imei: req.body.imei } },
      client: {
        connectOrCreate: { where: { cin: client.cin }, create: client },
      },
    },
  });
  await prisma.device.update({
    where: { imei: req.body.imei },
    data: { isAvailable: false }
  });

  await prisma.swap.create({
    data: {
      imei: req.body.replacedIMEI,
      brand: req.body.brand,
      model: req.body.model,
      price: `${req.body.price}`,
      intervention: { connect: { id: intervention.id } },
    },
  });

  await prisma.swap_status.create({
    data: {
      status: "En Attente Envoi PC",
      comment: "",
      intervention: { connect: { id: intervention.id } },
    },
  });
  res.json(intervention);
};
exports.detailsSwap = async (req, res, next) => {
  const result = await prisma.intervention.findUnique({
    where: { id: parseInt(req.body.id) },
    select: {
      id: true,
      status: true,
      Swap_status: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
  if (result)
    res.json({
      id: result.id,
      status: result.status,
      data: result.Swap_status,
    });
  else
    res.json({})
};
exports.pendingSwap = async (req, res, next) => {
  const intervention = await prisma.intervention.findMany({
    where: {
      dischargeId: null,
      workflow: req.query.type,
    },
    include: {
      device: true,
    },
  });
  if (intervention) return res.json(intervention);
  else res.json([]);
};

const FileUPload = require("../middleware/upload");
exports.etatWithPDF = async (req, res) => {
  await FileUPload(req, res);

  if (req.file == undefined)
    return res.status(400).send({ message: "Please upload a file!" });

  var data = JSON.parse(req.body.data);

  console.log(data);
  await prisma.intervention.update({
    where: { id: data.id },
    data: {
      outStore: false,
      intervention_status: {
        create: {
          obs: data.obs,
          status: data.status,
          local: data.shop,
          marque: data.operation.marque,
          modele: data.operation.modele,
          newIMEI: data.operation.newIMEI,
          pdflink: "http://127.0.0.1:3000/uploads/" + req.file.filename,
          amount: data.operation.amount,
        },
      },
    },
  });
  return res.json({ error: false });
  response = {
    message: {
      d1: "",
      d2: `uploaded File: ${req.file}`,
    },
  };

  res.status(200).send(response);
};

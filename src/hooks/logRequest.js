import prisma from "../database/prismaCliente.js";

const logRequest = async ({ user = null, url, method, body, params }) => {
  let clientsUuid = null;

  if (user) {
    const { payload } = user;
    clientsUuid = payload.uuid;
  }

  const createLogRequest = await prisma.LogRequests.create({
    data: {
      clientsUuid,
      route: url,
      method,
      body: JSON.stringify(body) || null,
      params: JSON.stringify(params) || null,
    },
  });
};

export default logRequest;

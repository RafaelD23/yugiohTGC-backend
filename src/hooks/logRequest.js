import prisma from "../database/prismaCliente.js"


const logRequest = async ({user, url, method, body, params}) => {

  const createLogRequest = await prisma.LogRequests.create({
    data: {
      clientsUuid: user.payload.uuid || null,
      route: url,
      method,
      body: JSON.stringify(body) || null,
      params: JSON.stringify(params) || null
    }
  })
}

export default logRequest;
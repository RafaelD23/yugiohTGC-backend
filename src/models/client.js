import prisma from "../database/prismaCliente.js";

async function getClientInfoByUUID(uuid) {
  const clienteExists = await prisma.clients.findUnique({
    where: {
      uuid,
    },
    select: {
      uuid: true,
      name: true,
      username: true,
      createdAt: true,
    },
  });

  if (!clienteExists) return false;

  return clienteExists;
}

export { getClientInfoByUUID };

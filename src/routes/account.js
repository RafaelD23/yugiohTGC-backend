import account from "./schemas/account.js";
import prisma from "../database/prismaCliente.js";
export default async function ACCOUNT_ROUTES(fastify, opts) {
  fastify.get("/", async (request, reply) => {
    try {
      const { data } = request.body;

      return {
        error: false,
        data: null,
      };
    } catch (error) {
      return {
        error: true,
        message: error.message,
        errorObj: { ...error },
        data: null,
      };
    }
  });

  fastify.post("/handle-login", account["/handle-login"], async (request, reply) => {
    try {
      const {data: {username, password}} = request.body;

      const dataClient = await prisma.Clients.findUnique({
        where: {
          username
        }
      })

      return {
        error: false,
        data: dataClient,
      };
    } catch (error) {
      return {
        error: true,
        message: error.message,
        errorObj: { ...error },
        data: null,
      };
    }
  })
}

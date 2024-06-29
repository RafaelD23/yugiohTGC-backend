import account from "./schemas/account.js";
import prisma from "../database/prismaCliente.js";
import { compareHash, generateHash } from "../utils/crypto.js";
import { generateToken } from "../utils/jwt.js";
export default async function ACCOUNT_ROUTES(fastify, opts) {
  fastify.get("/", async (request, reply) => {
    try {
      // const { data } = request.body;

      const hash = generateHash('nos');

      return {
        error: false,
        data: hash,
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

      const equalPassword = compareHash(password, dataClient.password);
      
      if(!equalPassword) {
       return reply.code(401).send({
          error: true,
          message: "Invalid password",
          data: null
        })
      }
      
      delete dataClient.password;
      const jwt_token = generateToken(dataClient);
  
      return {
        error: false,
        data: {
          username,
          token: jwt_token},
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
export default async function ACCOUNT_ROUTES(fastify, opts) {
  fastify.get("/", async (request, reply) => {
    try {
      // const { data } = request.body;

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
}

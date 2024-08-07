import Fastify from "fastify";
import getAllRoutes from "./routes/index.js";
import onRequest from "./hooks/onRequest.js";

const fastify = Fastify({
  logger: true,
});

fastify.addHook("onRequest", onRequest);

for (const { prefix, route } of getAllRoutes()) {
  await fastify.register(route, { prefix });
}

export default async function bootstrap() {
  try {
    await fastify.listen({ port: 3000, host: "0.0.0.0" });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

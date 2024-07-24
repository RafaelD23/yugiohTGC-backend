import Fastify from "fastify";

const fastify = Fastify({
  logger: true,
});

export default async function bootstrap() {
  try {
    await fastify.listen({ port: 3000, host: "0.0.0.0" });
    // console.log(`working`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

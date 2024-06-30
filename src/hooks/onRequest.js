import { getPublicRoutes } from "../routes/index.js";
import { validateToken } from "../utils/jwt.js";
import logRequest from "./logRequest.js";
const onRequest = async (request, reply) => {
  const { url } = request;

  const publicRoutes = getPublicRoutes();

  if (!publicRoutes.includes(url)) {
    if (!request.headers.authorization)
      return reply
        .code(401)
        .send({ error: true, message: "Authorization header not found!" });

    const [bearer, token] = request.headers.authorization.split(" ");

    if (token == "undefined" || bearer != "Bearer")
      return reply.code(401).send({ error: true, message: "Token not found!" });

    const jwt = validateToken(token);

    if (!jwt)
      return reply.code(401).send({ error: true, message: "Invalid token!" });

    request.user = jwt;
  }

  await logRequest(request);
};

export default onRequest;

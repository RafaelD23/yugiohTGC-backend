import axios from "axios";
import CardsMap from "../cards.map.js";

export default async function CARDS_ROUTES(fastify, options) {
  fastify.get("/", async (request, reply) => {
    try {
      const { limit = 10, offset = 0 } = request.query;

      const allCards = Array.from(CardsMap.values());

      if (allCards.length === 0) {
        return {
          error: true,
          mode: "warning",
          data: [],
          message: "No cards available",
        };
      }

      const paginatedCards = allCards.slice(offset, offset + limit);

      return {
        error: false,
        mode: "success",
        data: paginatedCards,
      };
    } catch (error) {
      return {
        error: true,
        mode: "error",
        message: error.message,
        errorObj: { ...error },
        data: null,
      };
    }
  });

  fastify.get("/all", async (request, reply) => {
    try {
      if (CardsMap.size > 0) {
        const allCards = Array.from(CardsMap.values());
        return {
          error: false,
          data: allCards,
          isCached: true,
        };
      }

      const url = process.env.YGOPRO_API_URL;
      const { data } = await axios.get(url);

      for (const card of data.data) {
        CardsMap.set(card.id, card);
      }

      return {
        error: false,
        data: data.data,
        isCached: false,
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

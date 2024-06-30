import axios from "axios";
import CardsMap from "../cards.map.js";
import prisma from "../database/prismaCliente.js";
import cards from "./schemas/cards.js";

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

  fastify.post(
    "/add-to-client",
    cards["/add-to-client"],
    async (request, reply) => {
      try {
        const {
          data: { cards },
        } = request.body;
        const {
          user: {
            payload: { uuid },
          },
        } = request;

        cards.map(async (id) => {
          const registerCardToUser = await prisma.ClientsCards.create({
            data: {
              cardId: id,
              clientsUuid: uuid,
            },
          });
        });

        return reply.code(201).send({
          error: false,
          message: "Card added successfully",
          data: cards,
        });
      } catch (error) {
        return {
          error: true,
          message: error.message,
          errorObj: { ...error },
          data: null,
        };
      }
    }
  );

  fastify.get("/info/:cardId", async (request, reply) => {
    try {
      const { cardId } = request.params;

      const cardInChace = CardsMap.get(cardId);

      if (cardInChace)
        return {
          error: false,
          isCached: true,
          data: { card: cardInChace },
        };

      const url = process.env.YGOPRO_API_URL + "?id=" + cardId;
      const { data } = await axios.get(url);
      CardsMap.set(cardId, data.data);

      return {
        error: false,
        isCached: false,
        data: { card: data.data },
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

  fastify.post(
    "/request-trade",
    cards["/request-trade"],
    async (request, reply) => {
      try {
        const {
          data: {
            clients: { uuid: toUuid },
            cards,
          },
        } = request.body;

        const { uuid: clientUuid } = request.user.payload;

        const tradeOffer = await prisma.TradeOffer.create({
          data: {
            sender: clientUuid,
            reciever: toUuid,
            status: "OPEN",
          },
        });

        const { uuid: tradeOfferUuid } = tradeOffer;

        function organizeCards(cards, tradeOfferUuid) {
          let result = [];

          for (const type in cards) {
            const cardArray = cards[type];
            const organizedCards = cardArray.map((card) => ({
              action: type.toUpperCase(),
              card,
              tradeOfferUuid,
            }));
            result = result.concat(organizedCards);
          }

          return result;
        }

        const tradeOfferCards = await prisma.TradeOfferCards.createMany({
          data: organizeCards(cards, tradeOfferUuid),
        });

        return {
          error: false,
          data: { ...tradeOfferCards },
        };
      } catch (error) {
        return {
          error: true,
          message: error.message,
          errorObj: { ...error },
          data: null,
        };
      }
    }
  );
}

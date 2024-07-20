import prisma from "../database/prismaCliente.js";
import trades from "./schemas/trades.js";

export async function TRADES_ROUTES(fastify, options) {
  fastify.post(
    "/request-trade",
    trades["/request-trade"],
    async (request, reply) => {
      try {
        const {
          data: {
            clients: { uuid: toUuid },
            cards,
          },
        } = request.body;

        const { uuid: clientUuid } = request.user.payload;

        const clienteExists = await prisma.clients.findUnique({
          where : { 
            uuid: toUuid
          }
        }) 

        if(!clienteExists){
          return reply.code(401).send({
              error: true,
              message: "Receiver not found!",
              data: null
          })
        }

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

  fastify.post(
    "/cards-from-trade",
    trades["/cards-from-trade"],
    async (request, reply) => {
      try {
        const {
          data: {
            trades: { uuid: tradeUuid },
          },
        } = request.body;

        const cardsFromSender = await prisma.TradeOfferCards.findMany({
          where: {
            tradeOfferUuid: tradeUuid,
            action: "FROM",
          },
        });

        const cardsFromReceiver = await prisma.TradeOfferCards.findMany({
          where: {
            tradeOfferUuid: tradeUuid,
            action: "TO",
          },
        });

        return {
          error: false,
          data: {
            trade: {
              uuid: tradeUuid,
            },
            cards: {
              from: cardsFromSender,
              to: cardsFromReceiver,
            },
          },
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

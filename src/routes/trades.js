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

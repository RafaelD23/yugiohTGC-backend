const trades = {
  "/request-trade": {
    schema: {
      body: {
        type: "object",
        required: ["data"],
        properties: {
          data: {
            type: "object",
            required: ["clients", "cards"],
            properties: {
              clients: {
                type: "object",
                required: ["uuid"],
                properties: {
                  uuid: { type: "string" },
                },
              },
              cards: {
                type: "object",
                required: ["from", "to"],
                properties: {
                  from: { type: "array" },
                  to: { type: "array" },
                },
              },
            },
          },
        },
      },
    },
  },
  "/cards-from-trade": {
    schema: {
      body: {
        type: "object",
        required: ["data"],
        properties: {
          data: {
            type: "object",
            required: ["trades"],
            properties: {
              trades: {
                type: "object",
                required: ["uuid"],
                properties: { uuid: { type: "string" } },
              },
            },
          },
        },
      },
    },
  },
};

export default trades;

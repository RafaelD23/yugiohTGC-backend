const cards = {
  "/add-to-client": {
    schema: {
      body: {
        type: "object",
        required: ["data"],
        properties: {
          data: {
            type: "object",
            required: ["cards"],
            properties: {
              cards: {
                type: "array",
              },
            },
          },
        },
      },
    },
  },
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
};
export default cards;

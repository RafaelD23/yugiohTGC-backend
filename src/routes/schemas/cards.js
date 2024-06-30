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
};
export default cards;

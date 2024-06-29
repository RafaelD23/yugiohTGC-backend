const account = {
  "/handle-login": {
    schema: {
      body: {
        type: "object",
        required: ["data"],
        properties:{
          data: {
            type: "object",
            required: ["username", "password"],
            properties : {
              username: {
                type: "string",
              },
              password: {
                type: "string",
              }
            }
          }
        }
      }
    }
  }
}

export default account;
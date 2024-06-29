require("dotenv").config();

module.exports = {
  apps: [
    {
      name: "server",
      script: "index.js",
      watch: true,
      node_args: "-r dotenv/config"
    }
  ]
}
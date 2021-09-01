// @ts-ignore
const server = require("./src/app");

server.listen(4000, () => {
  console.log("Live at", "http://localhost:4000"); // eslint-disable-line no-console
});

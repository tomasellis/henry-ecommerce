import server from "./src/app";
require("dotenv").config();

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log("Live at", `http://localhost:${PORT}`); // eslint-disable-line no-console
});

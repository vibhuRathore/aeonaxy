const express = require("express");
const cors = require("cors");
const routeHandlers = require("./route_handlers");

const PORT = 8080;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/signup", routeHandlers.signup);
app.get("/verify", routeHandlers.verify);

app.use(routeHandlers.notFound);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

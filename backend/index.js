const express = require("express");
const routeHandlers = require("./route_handlers");

const PORT = 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/signup", routeHandlers.signup);
app.get("/verify", routeHandlers.verify);

app.use(routeHandlers.notFound);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

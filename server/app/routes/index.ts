import express, { Router } from "express";
const router: Router = Router();
var event = require("./event");
import server from "./graphql";
module.exports = function(app: express.Application) {
  const PORT = process.env.PORT || 3000;
  app.use("/api/event", event);
  server.applyMiddleware({ app, path: "/api/" });
  app.listen({ port: PORT }, () =>
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
    )
  );
  app.get("/", (req: any, res: any) => {
    if (req.userContext.userinfo) {
      res.send(`Hi ${req.userContext.userinfo.name}!`);
    } else {
      res.send("Hi!");
    }
  });
};

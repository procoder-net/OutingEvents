import express, { Router } from "express";
const router: Router = Router();
var event = require("./event");
import server from "./graphql";
import authenticationRequired from "../OktaJwt";
import * as path from "path";
const multer = require("multer");
const publicRelativeUrl = "/api/content/";
let storage = multer.diskStorage({
  destination: function(req: any, file: any, cb: any) {
    cb(null, path.join(process.cwd(), "public"));
  },
  filename: function(req: any, file: any, cb: any) {
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    cb(null, file.fieldname + "-" + Date.now() + "." + extension);
  }
});
const upload = multer({ storage: storage });

module.exports = function(app: express.Application) {
  const PORT = process.env.PORT || 3000;
  app.use("/api/event", event);
  console.log(path.join(process.cwd(), "public"));
  app.use(
    "/api/content",
    express.static(path.join(process.cwd(), "public"), { maxAge: "7d" })
  );
  server.applyMiddleware({ app, path: "/api/graphql" });
  app.listen({ port: PORT }, () =>
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
    )
  );
  app.get("/api/auth", authenticationRequired, (req: any, res: any) => {
    console.log(req);
    /* if (req.userContext.userinfo) {
            res.send(`Hi ${req.userContext.userinfo.name}!`);
        } else {
            res.send("Hi!");
        } */
  });

  app.post("/api/upload", upload.single("photo"), (req: any, res: any) => {
    const filePath = publicRelativeUrl + req.file.filename;
    if (req.file) {
      res.json(filePath);
    } else throw "error";
  });
};

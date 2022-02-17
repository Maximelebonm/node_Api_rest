const express = require("express");
const Router = express.Router;
const controllers = require('../controllers')

class BaseRouter {

  constructor() {
    this.router = Router();
    this.name = this.constructor.name.replace(`Router`,``);
    this.table = this.name.toLowerCase();
    this.controller = new controllers[this.table]();
    this.initializeRoutes();
  }

  initializeRoutes = () => {
    //get all db contact table rows
    this.router.get("/", async (req, res) => {
        const response = await this.controller.getAll();
        res.send(response);
    });
    //get one db contact table row
    this.router.get("/:id", async (req, res) => {
        const response = this.controller.getOne(req.params.id);
      res.send(response);
    });
    //post to create one row in db table contact

    this.router.post("/", async (req, res) => {
        // console.log(req);
        console.log("requete arrivé : " , req.body);
        const response = await this.controller.createOne(req.body);
      res.send(response);
    });

    //put to update one row in db table contact
    this.router.put("/:id", async (req, res) => {
        const response = this.controller.updateOne(req.body, req.params.id);
      res.send(response);
    });
    //delete to destroy one row in db table contact
    this.router.patch("/:id", async (req, res) => {
        const response = this.controller.deleteOne(req.params.id);
      res.send(response);
    });
  };
}
module.exports = BaseRouter;
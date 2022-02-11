const express = require("express");
const Router = express.Router;
const controllers = require("../controllers");

class BaseRouter {

    constructor() {
        this.router = Router();
        this.name = this.constructor.name.replace(`Router`,``);
        this.table = this.name.toLowerCase();
        this.controller = new controllers[this.table]();
        this.initialize();
    }
    initialize = () => {
        //get all db contact table row
        this.router.get("/" , async (req, res) => {
            const response = this.controller.getAll();
            res.send(response);
        });
        // get one db contact table row
        this.router.get("/:id" , async (req, res) => {
            const response = this.controller.getOne(req.params.id);
            res.send(response);
        });
        // post tro create one row
        this.router.post("/" , async (req, res) => {
            const response = this.controller.createOne();
            res.send(response);
        });
        // put to update on row
        this.router.put("/:id" , async (req, res) => {
            const response = this.controller.updateOne(req.params.id);
            res.send(response);
        });
        // delete to destroy one row
        this.router.delete("/:id" , async (req, res) => {
            const response = this.controller.deleteOne(req.params.id);
            res.send(response);
        });

    }
   
}
module.exports = BaseRouter
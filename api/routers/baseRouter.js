const express = require("express");
const Router = express.Router;
class BaseRouter {

    constructor() {
        this.router = Router();
        this.name = this.constructor.name.replace('Router,"');
        this.table = this.name.toLowerCase();
        this.initialize();
    }
    initialize = () => {
        //get all db contact table row
        this.router.get("/" , async (req, res) => {
            res.send("get contact");
        });
        // get one db contact table row
        this.router.get("/:id" , async (req, res) => {
            res.send(`get contact id =${req.params.id}`);
        });
        // post tro create one row
        this.router.post("/" , async (req, res) => {
            res.send(`post creat one `);
        });
        // put to update on row
        this.router.put("/:id" , async (req, res) => {
            res.send(`put update id =${req.params.id}`);
        });
        // delete to destroy one row
        this.router.delete("/:id" , async (req, res) => {
            res.send(`delete id =${req.params.id}`);
        });

    }
   
}
module.exports = BaseRouter
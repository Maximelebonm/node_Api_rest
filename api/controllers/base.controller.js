const services = require("../services")

class BaseController{
    constructor() {
        this.name = this.constructor.name.replace(`Controller`,``);
        this.table = this.name.toLowerCase();  
        this.service = new services[this.table]();   
    }

    getAll = async () => {
        const result = await this.service.getAll();
        return result;
    }

    getOne = async (id) => {
        const result = await this.service.getOne(id);
        return result;
    }

    createOne = () => {
        return `create new ${this.table} `;
    }

    updateOne = (id) => {
        return `update ${this.table} row with id=${id} `;
    }

    deleteOne = (id) => {
        return `soft delete ${this.table} row with id=${id}`;
    }
}
module.exports = BaseController
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

    createOne = async (values) => {
        const result = await this.service.createOne(values);
        return result;
    }

    updateOne = (id) => {
        return `update ${this.table} row with id=${id} `;
    }

    deleteOne = (id) => {
        return `soft delete ${this.table} row with id=${id}`;
    }
}
module.exports = BaseController
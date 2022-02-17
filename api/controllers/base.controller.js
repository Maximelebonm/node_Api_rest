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
        const result = await this.service.insertOneOrMany(values);
        return result;
    }

    updateOne = async (values, id) => {
        const result = await this.service.updateOne(values, id)
        return result;
    }

    deleteOne = (id) => {
        return `soft delete ${this.table} row with id=${id}`;
    }
}
module.exports = BaseController
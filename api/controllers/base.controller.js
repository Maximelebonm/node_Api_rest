class BaseController{
    constructor() {
        this.name = this.constructor.name.replace(`Controller`,``);
        this.table = this.name.toLowerCase();     
    }

    getAll = () => {
        return `get All ${this.table} `;
    }

    getOne = (id) => {
       return `get One ${this.table} row with id=${id}`;
    }

    createOne = () => {
        return `create new ${this.table} `;
    }

    updateOne = (id) => {
        return `update ${this.table} row with id=${id} `;
    }

    deleteOne = (id) => {
        return `hard delete ${this.table} row with id=${id}`;
    }
}
module.exports = BaseController
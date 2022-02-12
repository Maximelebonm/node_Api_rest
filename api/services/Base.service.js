const dbConfig = require('../config/db.config');
const mysql = require("mysql");

class BaseService {
    constructor(){
        this.name = this.constructor.name.replace(`Service`,``);
        this.table = this.name.toLowerCase();
    }

    static connection;

    static connect = () => {
        if(!BaseService.connection){
            BaseService.connection = mysql.createPool({
                host: dbConfig.HOST,
                port: dbConfig.PORT,
                user: dbConfig.USER,
                password: dbConfig.PASS,
                database: dbConfig.NAME
              });
        }
        return BaseService.connection;
    }

    static executeQuery = async (sql) => {
        const result =
            await new Promise((resolve, reject)=>{
                BaseService.connect().query(sql,  (err, rows)=>{
                    if(err){
                        return reject(err);
                    }
                    return resolve(rows);
                });
            });  
        return result;
    }

    getAll = async () => {
        const sql = `SELECT * FROM ${this.table}`;
        const rows = await BaseService.executeQuery(sql);
        return rows;
    } 

    getOne = async (id) => {
        const sql = `SELECT * FROM ${this.table} WHERE id=${id}`;
        const rows =  await BaseService.executeQuery(sql);
        return rows.length == 1 ? rows.pop() : null;
    }
}
module.exports = BaseService;
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
    createOne = async(values) => {
        const fields = Object.keys(values)
        console.log("fields dans base service : " , fields);

        // const firstname="firstname";
        // const lastname="lastname";
        // const email="email";
        // const message="message";
      console.log("values dans base service : " , values);
        const ifirstname = values['firstname'];
        const ilastname = values['lastname'];
        const iemail = values['email'];
        const imessage = values['message'];

        const sql = `INSERT INTO ${this.table} (${fields[0]},${fields[1]},${fields[2]},${fields[3]}) VALUES('${ifirstname}','${ilastname}','${iemail}','${imessage}')`;
        const result = await BaseService.executeQuery(sql);
        // console.log(rows)
        console.log(result.insertId);
        if (result.insertId != null){
            console.log("ok")
            return "OK"
        }
        return result;
        // VALUES {"email":"bla@bla.com","lastname":"testn","firstname":"sf","message":"jhkjh"}`;
       // SELECT firstname=${firstname} , lastname=${lastname} , email=${email} ,message=${message}`;
    }
}
module.exports = BaseService;
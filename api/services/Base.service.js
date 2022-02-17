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
    // createOne = async (values) => {
    //     const fields = Object.keys(values);
    //     const test = "";
    //     console.log("fields dans base service : " , fields);
    //     console.log("values dans base service : " , values)
       
    //     console.log("test ", test)

    //   console.log("values dans base service : " , values);
    //     const ifirstname = values['firstname'];
    //     const ilastname = values['lastname'];
    //     const iemail = values['email'];
    //     const imessage = values['message'];

    //     const sql = `INSERT INTO ${this.table} (${fields[0]},${fields[1]},${fields[2]},${fields[3]}) VALUES('${ifirstname}','${ilastname}','${iemail}','${imessage}')`;
    //     const result = await BaseService.executeQuery(sql);
    //     // console.log(rows)
    //     console.log("sql ", sql)
    //     console.log(result.insertId);
    //     if (result.insertId != null){
    //         console.log("ok")
    //         return "OK"
    //     }
    //     return result;
       
    // }
    insertOneOrMany = async (params) => {
        if(Array.isArray(params)){//INSERT MANY ROWS
            const count = params.length
            console.log(count);
            for(let i = 0; i<count; i++){
                const columns = Object.keys(params[i]).join(',');
                console.log("collums",columns)
                let values = Object.values(params[i]);
                values = values.map(val => {
                    return val = ('"' + val.replace('"','') + '"')
                });// `'${val.replace("'","\'")}'`);
                values = values.join(',')
                console.log("value in for",values)
                let sql = `INSERT INTO ${this.table} (${columns}) VALUES (${values})`;
                var row = await BaseService.executeQuery(sql);
            }
            
            return row; 
 row = await this.getOne(result.insertId);

        }
        else{//INSERT ONE ROW
            const columns = Object.keys(params).join(',');
            let values = Object.values(params);
            values = values.map(val => {
                return val = ('"' + val.replace('"','') + '"')
            });// `'${val.replace("'","\'")}'`);
            values = values.join(',')
            let sql = `INSERT INTO ${this.table} (${columns}) VALUES (${values})`;
            const result = await BaseService.executeQuery(sql);
            console.log(result);
            let row = null;
            if(result.affectedRows === 1){
                row = await this.getOne(result.insertId);
            }
            return row;
        }
        
    }
    updateOne = async(values , id) =>{
        const fields = Object.keys(values);
      
        const firstname = values['firstname'];
        const lastname = values['lastname'];
        const email = values['email'];
        const message = values['message'];
        console.log("update table " , values , id)

        const sql = `UPDATE ${this.table} SET ${fields[0]}='${firstname}',${fields[1]}='${lastname}',${fields[2]}='${email}',${fields[3]}='${message}' WHERE id=${id}`
        const rows = await BaseService.executeQuery(sql);
        return rows;
    }
}
module.exports = BaseService;
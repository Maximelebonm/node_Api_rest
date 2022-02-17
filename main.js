const express = require("express");
const MailerService = require("./api/services/mailer.service")

const app = express();
const cors = require("cors");


const corsOptions = {
    origin : ["http://localhost:3000"]
};
app.use(cors(corsOptions));
app.use(express.json());



// const ContactRouter = require('./api/routers/contact.router');
// app.use('/contact', new ContactRouter().router);

const routers = require("./api/routers")

for(const route in routers){
    app.use(`/${route}`, new routers[route]().router)
}

app.use('/', ( req, res) => {
    res.send("ok");
});

//test
// const BaseService = require("./api/services/Base.service");

//TEST
const mailerService = new MailerService();
mailerService.sendMail({})
const mailer = MailerService.sendMail({to:"bedulaurent@gmail.com", subject:"Validation de compte", html:'<button>Valider l\'inscription</button>'});
// const BaseService = require('./api/services/base.service');
// console.log();
// const sql = "SELECT * FROM test WHERE id=1"; 
// const test = async () => {
//     const result = await BaseService.executeQuery(sql);
//     const bp = 1;  
// }
// test();


const PORT = 5001;
app.listen( PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
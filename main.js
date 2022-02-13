const express = require("express");

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
const BaseService = require("./api/services/Base.service");


const PORT = 5001;
app.listen( PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
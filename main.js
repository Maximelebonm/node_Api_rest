const express = require("express");


const app = express();

// const ContactRouter = require('./api/routers/contact.router');
// app.use('/contact', new ContactRouter().router);

const routers = require("./api/routers")
for(const route in routers){
    app.use(`/${route}`, new routers[route]().router)
}

app.use('/', ( req, res) => {
    res.send("ok");
});

const PORT = 5002;
app.listen( PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
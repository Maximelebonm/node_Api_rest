const express = require("express")

const app = express();
const contactRouter = require('./api/routers/contact.router');

app.use('/contact', contactRouter);

app.use('/', ( req, res) => {
    res.send("ok");
});

const PORT = 5002;
app.listen( PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
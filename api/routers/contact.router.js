const Router = require("express").Router;

const router = Router();
//get all db contact table row
router.get("/" , async (req, res) => {
    res.send("get contact");
});
// get one db contact table row
router.get("/:id" , async (req, res) => {
    res.send(`get contact id =${req.params.id}`);
});
// post tro create one row
router.post("/" , async (req, res) => {
    res.send(`post creat one `);
});
// put to update on row
router.put("/:id" , async (req, res) => {
    res.send(`put update id =${req.params.id}`);
});
// delete to destroy one row
router.delete("/:id" , async (req, res) => {
    res.send(`delete id =${req.params.id}`);
});
module.exports = router;
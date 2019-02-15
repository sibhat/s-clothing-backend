let express = require("express");
let server = express.Router();

server.get("/", (req, res) =>{
    res.json({"name": "hiii"})
});
module.exports = server;

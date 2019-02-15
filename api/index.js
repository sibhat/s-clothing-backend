let express = require("express");
let server = express.Router();

const queries = require("../data/queries");

server.get("/", (req, res) =>{
    queries.getProductsAll().then(result => {
        // console.log("result is", {result});
        res.status(200);
        res.json(result)
    }).catch(error => {
        res.status(500);
        res.json({"error":error});
    })

});
server.get("/category", (req, res) =>{
    queries.getCatagoryAll().then(result => {
        // console.log("result is", {result});
        res.status(200);
        res.json(result)
    }).catch(error => {
        res.status(500);
        res.json({"error":error});
    })

});
server.get("/department", (req, res) =>{
    queries.getDepartmentAll().then(result => {
        // console.log("result is", {result});
        res.status(200);
        res.json(result)
    }).catch(error => {
        res.status(500);
        res.json({"error":error});
    })

});
server.use("/users", queries.getAllUsers);
module.exports = server;

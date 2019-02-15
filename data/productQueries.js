const knex = require("./knex");

module.exports = {
    getProductsAll: () =>{
        return knex("product");
    }
};
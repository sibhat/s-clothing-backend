const knex = require("./knex");

module.exports = {
    getCatagoryAll: () =>{
        return knex("category");
    }
};
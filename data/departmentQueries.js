const knex = require("./knex");

module.exports = {
    getDepartmentAll: () =>{
        return knex("department");
    }
};
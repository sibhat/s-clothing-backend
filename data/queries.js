const products = require("./productQueries");
const department = require("./departmentQueries");
const category = require("./categoryQueries");
const users = require("./userQueries");
module.exports = {
    ...products,
    ...department,
    ...category,
    ...users,
};

const products = require("./productQueries");
const department = require("./departmentQueries");
const category = require("./categoryQueries");
module.exports = {
    ...products,
    ...department,
    ...category,
};

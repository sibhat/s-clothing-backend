
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', function (users) {
        users.increments().unsigned();
        users.string("first_name", 128).notNullable();
        users.string("last_name", 128).notNullable();
        users.string("email", 128).notNullable().unique();
        users.string("provider", 128).notNullable().defaultTo("local");
        users.string("password", 128).notNullable().defaultTo("");
        users.enu("role", ["Client", "Admin"]).notNullable().defaultTo("Client");
    })
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfExists("users")
    ]);
};

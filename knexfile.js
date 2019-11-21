// Update with your config settings.

module.exports = {
  development: {
    client: "pg",
    connection: "postgres://localhost/allshade",
    migrations: {
      directory: "./db/migrations"
    },
    useNullAsDefault: true
  }
};

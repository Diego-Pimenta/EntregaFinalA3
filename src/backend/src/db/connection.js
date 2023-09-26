const { Sequelize } = require('sequelize');

let conn = null;

/* = new Sequelize('postgres://user:pass@example.com:5432/dbname');
a conexão com o postgres também pode ser realizada dessa forma */
conn = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'postgres'
});

try {
    await conn.authenticate();
    console.log('Connection has been established successfully.');
} catch (err) {
    console.error('Unable to connect to the database:', err);
}
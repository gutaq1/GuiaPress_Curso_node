const Sequelize = require("sequelize");

const connection = new Sequelize('guiapress','root','071109',{
    host: 'localhost',
    dialect: 'mysql',
    timezone: "-03:00" //timezone Brasil
});

module.exports = connection;
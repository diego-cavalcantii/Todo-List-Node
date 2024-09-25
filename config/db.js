const { Sequelize } = require('sequelize');

// Conexão com o banco de dados MySQL
const sequelize = new Sequelize('todo_api', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conectado ao MySQL com sucesso!');
  } catch (error) {
    console.error('Erro ao conectar com o MySQL:', error);
  }
};

module.exports = { sequelize, connectDB };

const express = require('express');
const { connectDB, sequelize } = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

// Conectar ao banco de dados
connectDB();

// Middleware para JSON
app.use(express.json());

// Rotas
app.use('/api', taskRoutes);

// Sincronizar modelos com o banco de dados
sequelize.sync().then(() => {
  console.log('Banco de dados sincronizado');
});

// Porta do servidor
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

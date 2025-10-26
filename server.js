// 1. Importar o Express
const express = require('express');

// 2. Inicializar o aplicativo Express
const app = express();

// 3. Definir a porta
const PORT = process.env.PORT || 3000;

// --- A Linha Mágica ---

// LINHA 1: Servindo o Frontend (da raiz)
app.use(express.static('.')); 

// LINHA 2: Habilitando a API (ainda necessária para o futuro)
app.use(express.json());

// --- Fim das Linhas Mágicas ---

// 4. Iniciar o Servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando com sucesso!`);
  console.log(`Acesse http://localhost:${PORT} no seu navegador.`);
});
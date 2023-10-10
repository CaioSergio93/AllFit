const http = require('http');
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser'); // Importe o módulo body-parser


app.use(bodyParser.urlencoded({ extended: true }));

// Crie um servidor HTTP
const server = http.createServer((req, res) => {
  // Roteamento para servir arquivos estáticos (HTML, CSS, JavaScript)
  let filePath = '.' + req.url;
  if (filePath === './') {
    filePath = './index.html';
  }

  if (filePath === './cadastro') {
    filePath = './cadastro.html';
  }

  const extname = path.extname(filePath);
  let contentType = 'text/html';

  switch (extname) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        // Página não encontrada
        res.writeHead(404);
        res.end('404 - Not Found');
      } else {
        // Erro interno do servidor
        res.writeHead(500);
        res.end('500 - Internal Server Error');
      }
    } else {
      // Resposta bem-sucedida
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

// Configure a porta em que o servidor irá escutar
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Servidor está rodando na porta ${port}`);
});

const { db, inserirCadastro } = require('./database');

// Rota para processar o formulário de registro
app.post ('/registrar'), (req, res) => {
  const { nome, sexo, idade, altura, peso, email, telefone, senha } = req.body; // Inclua a senha aqui

  const cadastro = {
    id,
    nome,
    sexo,
    idade,
    altura,
    peso,
    email,
    telefone,
    senha, // Inclua a senha aqui
  };

  // Insira o cadastro no banco de dados
  inserirCadastro(cadastro, (err, cadastroID) => {
    if (err) {
      res.status(500).send('Erro ao registrar.');
    } else {
      // Redireciona para a página de treinos após o registro bem-sucedido
      res.redirect('treinos.html');
    }
  });
};

// Rota para a página de treinos
app.get('/treinos.html', (req, res) => {
  res.sendFile(path.join(__dirname, treinos.html));
});
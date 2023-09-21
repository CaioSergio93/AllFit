const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');

app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: 'localhost:3306', // Endereço do servidor MySQL
  user: 'root', // Seu nome de usuário do MySQL
  password: 'Cs023109', // Sua senha do MySQL
  database: 'allfit', // Nome do banco de dados MySQL
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados MySQL:', err.message);
  } else {
    console.log('Conectado ao banco de dados MySQL.');

    db.query(createTableQuery, (err, result) => {
      if (err) {
        console.error('Erro ao criar a tabela de cadastros:', err.message);
      } else {
        console.log('Tabela de cadastros criada (ou já existente).');
      }
    });
  }
});

app.post('/registrar', (req, res) => {
  const { nome, sexo, idade, altura, peso, email, telefone, senha } = req.body;

  const cadastro = {
    nome,
    sexo,
    idade,
    altura,
    peso,
    email,
    telefone,
    senha,
  };

  const insertQuery = 'INSERT INTO cadastros SET ?';

  db.query(insertQuery, cadastro, (err, result) => {
    if (err) {
      console.error('Erro ao inserir cadastro:', err.message);
      res.status(500).send('Erro ao registrar.');
    } else {
      console.log(`Cadastro inserido com sucesso. ID: ${result.insertId}`);
      res.status(200).send(`Cadastro bem-sucedido. ID: ${result.insertId}`);
    }
  });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Servidor está rodando na porta ${port}`);
});

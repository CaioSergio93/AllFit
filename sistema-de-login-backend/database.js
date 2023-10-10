const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./cadastros.db', (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.message);
  } else {
    console.log('Conectado ao banco de dados SQLite3.');

    // Mova a criação da tabela para dentro do callback de sucesso
    db.run(`
      CREATE TABLE IF NOT EXISTS cadastros (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT,
        sexo TEXT,
        idade INTEGER,
        altura REAL,
        peso REAL,
        email TEXT,
        telefone TEXT,
        senha TEXT
      )
    `, (createErr) => {
      if (createErr) {
        console.error('Erro ao criar tabela de cadastros:', createErr.message);
      } else {
        console.log('Tabela de cadastros criada com sucesso.');
      }
    });
  }
});

function inserirCadastro(cadastro, callback) {
  const { nome, sexo, idade, altura, peso, email, telefone, senha } = cadastro;
  const sql = `
    INSERT INTO cadastros (nome, sexo, idade, altura, peso, email, telefone, senha)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(sql, [nome, sexo, idade, altura, peso, email, telefone, senha], function (err) {
    if (err) {
      console.error('Erro ao inserir cadastro:', err.message);
      callback(err);
    } else {
      console.log(`Cadastro inserido com sucesso. ID: ${this.lastID}`);
      callback(null, this.lastID);
    }
  });
}

module.exports = {
  db,
  inserirCadastro,
};

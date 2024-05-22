const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');

// Crie uma instância do servidor Express
const app = express();
const port = 3000;

// Middleware para analisar corpos de solicitação JSON
app.use(bodyParser.json());
app.use(express.static('public')); // Para servir arquivos estáticos como HTML, CSS, JS

// Configuração da conexão com o banco de dados MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'user'
});

// Estabelecendo a conexão com o banco de dados
connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conexão com o banco de dados estabelecida com sucesso');
});

// Rota para lidar com solicitações de login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Consulta SQL para verificar as credenciais do usuário no banco de dados
    const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
    connection.query(sql, [username, password], (err, results) => {
        if (err) {
            console.error('Erro ao realizar login:', err);
            return res.status(500).send('Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente mais tarde.');
        }

        // Verifica se o usuário foi encontrado no banco de dados
        if (results.length > 0) {
            // Usuário autenticado com sucesso
            return res.status(200).send('Login bem-sucedido!');
        } else {
            // Credenciais inválidas
            return res.status(401).send('Nome de usuário ou senha incorretos.');
        }
    });
});

// Rota para lidar com solicitações de cadastro
app.post('/cadastro', (req, res) => {
    const { nome, email, cpf, telefone, password } = req.body;

    // Consulta SQL para inserir um novo usuário no banco de dados
    const sql = 'INSERT INTO users (nome, email, cpf, telefone, password) VALUES (?, ?, ?, ?, ?)';
    connection.query(sql, [nome, email, cpf, telefone, password], (err, result) => {
        if (err) {
            console.error('Erro ao cadastrar usuário:', err);
            return res.status(500).send('Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente mais tarde.');
        }

        // Usuário cadastrado com sucesso
        return res.status(200).send('Usuário cadastrado com sucesso!');
    });
});

// Servir a página de cadastro
app.get('/cadastro.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'cadastro.html'));
});

// Servir a página de login
app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Inicie o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

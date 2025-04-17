const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Usuário fixo
const USER = { username: "admin", password: "1234" };

// Armazenamento em memória
let produtos = [];
let isLoggedIn = false;

// Middleware para arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

// Middleware de autenticação
function authMiddleware(req, res, next) {
    if (!isLoggedIn) {
        return res.status(401).json({ mensagem: "Acesso não autorizado. Faça login para continuar." });
    }
    next();
}

// Login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === USER.username && password === USER.password) {
        isLoggedIn = true;
        res.json({ mensagem: "Login realizado com sucesso!" });
    } else {
        res.status(401).json({ mensagem: "Usuário ou senha inválidos." });
    }
});

// Logout
app.post('/logout', (req, res) => {
    isLoggedIn = false;
    res.json({ mensagem: "Logout realizado com sucesso." });
});

// Lista pública de produtos
app.get('/produtos', (req, res) => {
    res.json(produtos);
});

// Adicionar produto (privado)
app.post('/produtos', authMiddleware, (req, res) => {
    const { nome, preco, quantidade } = req.body;

    if (!nome || preco == null || quantidade == null || quantidade < 0) {
        return res.status(400).json({ mensagem: "Nome, preço e quantidade são obrigatórios. Quantidade não pode ser negativa." });
    }

    const id = produtos.length + 1;
    produtos.push({ id, nome, preco, quantidade });
    res.status(201).json({ mensagem: "Produto adicionado com sucesso!" });
});

// Editar produto (privado)
app.put('/produtos/:id', authMiddleware, (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, preco, quantidade } = req.body;

    const produto = produtos.find(p => p.id === id);
    if (!produto) {
        return res.status(404).json({ mensagem: "Produto não encontrado." });
    }
    if (nome) produto.nome = nome;
    if (preco != null) produto.preco = preco;
    if (quantidade != null && quantidade >= 0) produto.quantidade = quantidade;

    res.json({ mensagem: "Produto atualizado com sucesso." });
});

// Excluir produto (privado)
app.delete('/produtos/:id', authMiddleware, (req, res) => {
    const id = parseInt(req.params.id);
    const index = produtos.findIndex(p => p.id === id);
    if (index === -1) {
        return res.status(404).json({ mensagem: "Produto não encontrado." });
    }
    produtos.splice(index, 1);
    res.json({ mensagem: "Produto excluído com sucesso." });
});

// Start do servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

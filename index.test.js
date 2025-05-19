const request = require('supertest');
const app = require('./index');

// Testes de Lista de Produtos
describe('Teste de Lista de Produtos', () => {

  it('Permitir acesso público à lista de produtos', async () => {
    const res = await request(app).get('/produtos');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('Não permitir adicionar produto sem login', async () => {
    const res = await request(app)
      .post('/produtos')
      .send({ nome: "Teste Produto", preco: 100, quantidade: 10 });
    expect(res.statusCode).toBe(401);
  });

});


// Testes de Login
describe('Teste de casos de Login', () => {

  it('Fazer login corretamente', async () => {
    const res = await request(app)
      .post('/login')
      .send({ username: 'admin', password: '1234' });
    expect(res.statusCode).toBe(200);
    expect(res.body.mensagem).toBe('Login realizado com sucesso!');
  });

  it('Não fazer login com dados inválidos', async () => {
    const res = await request(app)
      .post('/login')
      .send({ username: 'admin', password: 'senhaerrada' });
    expect(res.statusCode).toBe(401);
    expect(res.body.mensagem).toBe('Usuário ou senha inválidos.');
  });

});

// Testes de Cadastro de Mercadoria
describe('Teste de Cadastro de Mercadoria Inválido', () => {
  let agent = request.agent(app);

  beforeAll(async () => {
    await agent
      .post('/login')
      .send({ username: 'admin', password: '1234' });
  });

  it('Não permitir cadastro de mercadoria com nome nulo', async () => {
    const res = await agent
      .post('/produtos')
      //Nome nulo
      .send({ nome: null, preco: 50, quantidade: 5 });
    expect(res.statusCode).toBe(400);
    expect(res.body.mensagem).toBe("Nome, preço e quantidade são obrigatórios. Quantidade não pode ser negativa.");
  });

  it('Não permitir cadastro de mercadoria com preço nulo', async () => {
    const res = await agent
      .post('/produtos')
      //Preço nulo
      .send({ nome: "Produto Teste", preco: null, quantidade: 5 });
    expect(res.statusCode).toBe(400);
    expect(res.body.mensagem).toBe("Nome, preço e quantidade são obrigatórios. Quantidade não pode ser negativa.");
  });

  it('Não permitir cadastro de mercadoria com quantidade nula', async () => {
    const res = await agent
      .post('/produtos')
      //Quantidade nula
      .send({ nome: "Produto Teste", preco: 50, quantidade: null });
    expect(res.statusCode).toBe(400);
    expect(res.body.mensagem).toBe("Nome, preço e quantidade são obrigatórios. Quantidade não pode ser negativa.");
  });

});

// Testes de Gerenciamento de Mercadoria
describe('Teste de Gerenciamento de Mercadoria', () => {
  let agent = request.agent(app);

  beforeAll(async () => {
    await agent
      .post('/login')
      .send({ username: 'admin', password: '1234' });
  });

  it('Excluir mercadoria criada', async () => {
    //Cria e depois exclui uma mercadoria
    const addRes = await agent
      .post('/produtos')
      .send({ nome: "Produto Exclusão", preco: 99.99, quantidade: 10 });

    expect(addRes.statusCode).toBe(201);
    expect(addRes.body.mensagem).toBe("Produto adicionado com sucesso!");

    const produtosRes = await agent.get('/produtos');
    const produtoCriado = produtosRes.body.find(p => p.nome === "Produto Exclusão");

    expect(produtoCriado).toBeDefined();

    const deleteRes = await agent.delete(`/produtos/${produtoCriado.id}`);
    expect(deleteRes.statusCode).toBe(200);
    expect(deleteRes.body.mensagem).toBe("Produto excluído com sucesso.");
  });

  it('Adicionar uma mercadoria', async () => {
    const res = await agent
      .post('/produtos')
      .send({ nome: "Produto Novo", preco: 150.50, quantidade: 20 });

    expect(res.statusCode).toBe(201);
    expect(res.body.mensagem).toBe("Produto adicionado com sucesso!");

    // Confirma se foi adicionado
    const produtosRes = await agent.get('/produtos');
    const produto = produtosRes.body.find(p => p.nome === "Produto Novo");
    expect(produto).toBeDefined();
    expect(produto.preco).toBe(150.50);
    expect(produto.quantidade).toBe(20);
  });

  it('Editar uma mercadoria existente', async () => {
    // Adiciona um produto e depois edita
    const addRes = await agent
      .post('/produtos')
      .send({ nome: "Produto Editar", preco: 200, quantidade: 5 });

    expect(addRes.statusCode).toBe(201);

    const produtosRes = await agent.get('/produtos');
    const produtoCriado = produtosRes.body.find(p => p.nome === "Produto Editar");

    expect(produtoCriado).toBeDefined();

    // Edita o produto
    const editRes = await agent
      .put(`/produtos/${produtoCriado.id}`)
      .send({ nome: "Produto Editado", preco: 250, quantidade: 10 });

    expect(editRes.statusCode).toBe(200);
    expect(editRes.body.mensagem).toBe("Produto atualizado com sucesso.");

    // Confirma as alterações
    const produtosAtualizados = await agent.get('/produtos');
    const produtoAtualizado = produtosAtualizados.body.find(p => p.id === produtoCriado.id);

    expect(produtoAtualizado.nome).toBe("Produto Editado");
    expect(produtoAtualizado.preco).toBe(250);
    expect(produtoAtualizado.quantidade).toBe(10);
  });

});


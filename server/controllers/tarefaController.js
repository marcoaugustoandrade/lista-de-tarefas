const conexao = require('../config/conexao');

exports.listarTodos = (req, res) => {

  const query = 'select * from tarefas order by data asc';
  conexao.query(query, (err, rows) => {
    if (err){
      console.log(err);
      res.status(500);
      res.json({
        message: "Internal Server Error"
      });
    } else if (rows.length > 0){
      res.status(200);
      res.json(rows)
    } else {
      res.status(404);
      res.json({
        message: "Nenhuma tarefa cadastrada"
      });
    }
  });
}

exports.listarPorDescricao = (req, res) => {

  let descricao = req.params.descricao || "";
  descricao = "%" + descricao + "%";
  
  const query = 'select * from tarefas where descricao like ? order by data asc';
  conexao.query(query, [descricao], (err, rows) => {
    if (err){
      console.log(err);
      res.status(500);
      res.json({
        message: "Internal Server Error"
      });
    } else if (rows.length > 0){
      res.status(200);
      res.json(rows)
    } else {
      res.status(404);
      res.json({
        message: "Nenhuma tarefa encontrada para este filtro"
      });
    }
  });
}

exports.listarPorDescricaoPaginado = (req, res) => {

  const pagina = req.params.pagina || '1';
  let descricao = req.params.descricao || "";
  descricao = "%" + descricao + "%";

  // Quantidade de items por página
  const itemsPorPagina = 5;
  
  // Determinando a quantidade de tarefas cadastradas
  const queryCount = 'select count(*) as contador from tarefas';
  conexao.query(queryCount, (err, rows) => {
    const qtdPaginas = rows[0].contador / itemsPorPagina;
  });

  // Definindo o fim e o inicio da paginação
  const fim = (itemsPorPagina * pagina) - 1;
  const inicio = fim - 4;

  const query = 'select * from tarefas where descricao like ? order by data asc limit ?,?';
  conexao.query(query, [descricao, inicio, fim], (err, rows) => {
    if (err){
      console.log(err);
      res.status(500);
      res.json({
        message: "Internal Server Error"
      });
    } else if (rows.length > 0){
      res.status(200);
      res.json(rows)
    } else {
      res.status(404);
      res.json({
        message: "Nenhuma tarefa encontrada para este filtro"
      });
    }
  });  
}

exports.listarPorId = (req, res) => {

  const id = req.params.id;
  const query = 'select * from tarefas where id = ?';

  conexao.query(query, [id], (err, rows) => {
    if (err) {
      console.log(err);
      res.status(500);
      res.json({
        message: "Internal Server Error"
      });
    } else if (rows.length > 0) {
      res.status(200);
      res.json(rows[0]);
    } else {
      res.status(404);
      res.json({
        message: "Tarefa não encontrada"
      });
    }
  });
}

exports.inserir = (req, res) => {

  const tarefa = {};
  tarefa.descricao = req.body.descricao;
  tarefa.data = req.body.data;
  tarefa.realizado = false;

  const query = 'insert into tarefas (descricao, data) values (?, ?)'

  conexao.query(query, [tarefa.descricao, tarefa.data, tarefa.realizado], (err, rows) => {
    if (err) {
      console.log(err);
      res.status(500);
      res.json({
        message: "Internal Server Erro"
      })
    } else {
      res.status(201);
      res.json({
        message: "Tarefa inserida"
      })
    }
  });
}

exports.alterar = (req, res) => {

  const tarefa = {};
  tarefa.id = req.params.id;
  tarefa.descricao = req.body.descricao;
  tarefa.data = req.body.data;
  tarefa.realizado = req.body.realizado;

  const query = 'update tarefas set descricao = ?, data = ?, realizado = ? where id = ?';
  conexao.query(query, [tarefa.descricao, tarefa.data, tarefa.realizado, tarefa.id], (err, rows) => {
    if (err){
      console.log(err);
      res.status(500);
      res.json({
        message: "Internal Server Erro"
      });
    } else if (rows.affectedRows > 0){
      res.status(202);
      res.json({
        message: "Tarefa atualizada"
      });
    } else {
      res.status(404);
      res.json({
        message: "Tarefa não encontrada"
      })
    }
  });
}

exports.deletar = (req, res) => {

  const id = req.params.id;

  const query = 'delete from tarefas where id = ?';
  conexao.query(query, [id], (err, rows) => {
    if (err){
      console.log(err);
      res.status(500);
      res.json({
        message: "Internal Server Erro"
      })
    } else if(rows.affectedRows > 0){
      res.status(200);
      res.json({
        message: "Tarefa deletada"
      });
    } else {
      res.status(404);
      res.json({
        message: "Tarefa não encontrada"
      });
    }
  });
}

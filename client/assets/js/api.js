/* Arquivo responsável por acessar a API */

let url = 'http://localhost:3010/api/v1/tarefas';

function inserirTarefa(tarefa) {

  return new Promise(function (resolve, reject) {
    let url = 'http://localhost:3010/api/v1/tarefas';
    let requisicao = new XMLHttpRequest();
    requisicao.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status == 201) {
          resolve(JSON.parse(this.responseText));
        } else {
          reject("Erro ao enviar dados ao servidor!");
        }
      }
    }
    requisicao.open("POST", url, true);
    requisicao.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    requisicao.send(JSON.stringify(tarefa));
  });
}

function alterarTarefa(tarefa) {

  return new Promise(function (resolve, reject) {
    let url = 'http://localhost:3010/api/v1/tarefas/' + tarefa.id;
    let requisicao = new XMLHttpRequest();
    requisicao.onreadystatechange = function () {
      if (this.readyState == 4){
        if (this.status == 202) {
          resolve(JSON.parse(this.responseText));
        } else {
          reject("Erro ao enviar dados ao servidor!");
        }
      }
    }
    requisicao.open("PUT", url, true);
    requisicao.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    requisicao.send(JSON.stringify(tarefa));
  });
}

function deletarTarefa(id) {

  return new Promise(function(resolve, reject){
    let url = 'http://localhost:3010/api/v1/tarefas/' + id;
    let requisicao = new XMLHttpRequest();
    requisicao.onreadystatechange = function () {
      if (requisicao.readyState == 4){
        if (requisicao.status == 200) {
          resolve(JSON.parse(this.responseText));
        } else {
          reject("Erro ao enviar dados ao servidor!");
        }
      }
    }
    requisicao.open("DELETE", url, true);
    requisicao.send();  
  });
}

function listarPorId(id) {

  return new Promise(function (resolve, reject) {
    let url = 'http://localhost:3010/api/v1/tarefas/' + id;
    let requisicao = new XMLHttpRequest();
    requisicao.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status == 200) {
          // console.table(JSON.parse(this.responseText));
          resolve(JSON.parse(this.response));
        } else {
          reject("Erro ao carregar dados do servidor!");
        }
      }
    }
    requisicao.open("GET", url, true);
    requisicao.send();
  });
}

function listarTarefas(filtro) {

  return new Promise(function (resolve, reject) {
    let url = 'http://localhost:3010/api/v1/tarefas/f/' + filtro;
    let requisicao = new XMLHttpRequest();
    requisicao.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status == 200) {
          resolve(JSON.parse(this.response));
        } else {
          reject("Erro ao carregar dados do servidor!");
        }
      }
    }
    requisicao.open("GET", url, true);
    requisicao.send();
  });
}
/* Arquivo responsável por manipular o DOM e fazer a ligação com as funções da API */

// Caso o botão Pesquisar seja clicado
document.querySelector('#btn-buscar').addEventListener('click', function (event) {

  // Previne que o formulário seja submetido
  event.preventDefault();
  // Monta o painel de cartões
  montarPainel();
});

// Função para montar o painel de cartões
function montarPainel() {

  // Limpa o painel de tarefas
  let painelTarefas = document.querySelector('#painelTarefas');
  painelTarefas.innerHTML = '';

  // Captura texto da busca
  let filtro = document.querySelector('#texto-busca').value;
  // console.log(filtro);

  // Espera o resultado
  let promise = listarTarefas(filtro);
  promise
    // Caso o resultado processado
    .then(function (response) {

      // Cria o cartão e adiciona ao painel de cartões
      response.forEach(function (item) {
        let cartao = document.createElement('div');
        cartao.className = 'card';
        cartao.innerHTML = `
            <div class="card-body">
            <div>
                <span class="card-subtitle mb-2 text-muted">${dataToString(item.data)}</span>
            </div>
            <p class="card-text">${item.descricao}</p>
            </div>    
          `;
        painelTarefas.appendChild(cartao);

        // Adicionado posteriormente para vincular cada cartão a um addEventListener
        cartao.addEventListener('click', function (event) {
          montarFormularioAlterar(item.id);
        });
      });
    })
    // Caso não seja processado
    .catch(function (error) {
      console.log(error);
      mensagem(error, 'danger');
    });
}

// Quando o botão Adicionar for clicado mostra o modal
document.querySelector('#btn-adicionar').addEventListener('click', function (event) {

  // Previne que o formulário não seja submetido
  event.preventDefault();

  // Mostrando o modal
  $('#modal').modal('toggle');

  // Limpando o formulário
  document.querySelector('#descricao-tarefa').value = '';
  document.querySelector('#data-tarefa').value = '';

  // Setando o focus para o campo descrição
  document.querySelector('#descricao-tarefa').focus();

  // Alterando a aparência do formulário
  document.querySelector('.modal-title').innerHTML = 'Inserir uma nova tarefa';
  document.querySelector('#btn-inserir').classList.remove('nao-mostrar');
  document.querySelector('#btn-alterar').classList.add('nao-mostrar');
  document.querySelector('#btn-deletar').classList.add('nao-mostrar');
});

// Quando o botão Inserir for clicado uma nova tarefa é inserida via API
document.querySelector('#btn-inserir').addEventListener('click', function (event) {

  // Previne que o formulário não seja submetido
  event.preventDefault();
  // Inseri uma nova tarefa
  inserir();
});

// Função para montar o formulário e espera para inserir uma nova tarefa
function inserir() {

  // Capturando os campos do formulário
  let descricaoTarefa = document.querySelector('#descricao-tarefa');
  let dataTarefa = document.querySelector('#data-tarefa');

  // Mudando o comportamento dos botões
  document.querySelector('#btn-inserir').setAttribute('type', 'submit');
  document.querySelector('#btn-alterar').setAttribute('type', 'button');

  // Criando um objeto Tarefa
  let tarefa = {};
  tarefa.descricao = descricaoTarefa.value;
  tarefa.data = dataTarefa.value;

  // Inserindo a nova tarefa
  let promise = inserirTarefa(tarefa);
  promise
    .then(function (response) {
      // Mostrando mensagem
      mensagem('Tarefa cadastrada com sucesso!', 'success');
      // Montando o painel de cartões
      montarPainel();
    })
    .catch(function (error) {
      console.log(error);
    });

  // Fechando o modal
  $('#modal').modal('toggle');
}

// Armazenando a tarefa selecionada
let tarefa = {};

// Função para montar o formulário para alterar uma nova tarefa
function montarFormularioAlterar(id) {

  // Carregando dados no formulário via API
  let promise = listarPorId(id);
  promise
    .then(function (resolve) {

      // Adicionando os dados da tarefa selecionada no objeto Tarefa
      tarefa.id = resolve.id;
      tarefa.descricao = resolve.descricao;
      tarefa.data = dataToInput(resolve.data);

      // Abrindo o modal
      $('#modal').modal('toggle');

      // Mudando o comportamento dos botões
      document.querySelector('#btn-inserir').setAttribute('type', 'button');
      document.querySelector('#btn-alterar').setAttribute('type', 'submit');

      // Populando os campos do formulário
      document.querySelector('#idTarefa').value = tarefa.id;
      document.querySelector('#descricao-tarefa').value = tarefa.descricao;
      document.querySelector('#data-tarefa').value = tarefa.data;

      // Setando o focus para o campo descrição
      document.querySelector('#descricao-tarefa').focus();

      // Alterando o título do formulário
      document.querySelector('.modal-title').innerHTML = 'Alterando uma tarefa';

      // Mostrando e ocultando os botões
      document.querySelector('#btn-inserir').classList.add('nao-mostrar');
      document.querySelector('#btn-alterar').classList.remove('nao-mostrar');
      document.querySelector('#btn-deletar').classList.remove('nao-mostrar');


    })
    .catch(function (error) {
      console.log(error);
      mensagem(error, 'danger');
    });
}

// Caso o botão Alterar seja clicado
document.querySelector('#btn-alterar').addEventListener('click', function (event) {

  // Previne que o formulário seja submetido
  event.preventDefault();

  // Atualizando o objeto tarefa
  tarefa.id = document.querySelector('#idTarefa').value;
  tarefa.descricao = document.querySelector('#descricao-tarefa').value;
  tarefa.data = document.querySelector('#data-tarefa').value

  let promiseAlterar = alterarTarefa(tarefa);
  promiseAlterar
    .then(function (resolve) {

      // Montando o painel
      montarPainel();
      // Fechando o modal
      $('#modal').modal('toggle');
      // Mensagem informando o usuário
      mensagem('Tarefa alterada com sucesso!', 'success');
    })
    .catch(function (error) {
      console.log(error);
      mensagem(error, 'danger');
    });
});

// Caso o botão Deletar seja clicado
document.querySelector('#btn-deletar').addEventListener('click', function (event) {

  // Previne que o formulário seja submetido
  event.preventDefault();

  let promiseDeletar = deletarTarefa(tarefa.id);
  promiseDeletar
    .then(function (resolve) {
      // Montando o painel;
      montarPainel();
      // Fechando o modal
      $('#modal').modal('toggle');
      // Mensagem informando o usuário
      mensagem('Tarefa excluída com sucesso!', 'success');
    })
    .catch(function (error) {
      console.log(error);
      mensagem(error, 'danger');
    });
});
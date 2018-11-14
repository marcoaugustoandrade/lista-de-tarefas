# API Tarefas V1

## Banco de dados
Para criar o banco de dados utilize o comando:
```
mysql -u root -p < server/database.sql
```
Verifique, também, o arquivo .env e veja se as configurações estão de acordo.


## Utilizando o docker-compose
Alternativamente, você pode utilizar o docker-compose com o comando:
```
docker-compose up -d
```
A porta utilizada pelo MySQL deste docker-compose é a 3307. Assim, não esqueça de muda-la no arquivo .env.


## Dependências do projeto
Para instalar as dependências do projeto utilize o comando:
```
npm install
```


## Rodando o servidor
Para rodar o servidor utilize o comando:
```
npm run dev
```

## Documentação da API
Acesse a documentação em http://localhost:3010/api/v1/docs/


##  Trabalho prático
A partir da aplicação desenvolvida em sala de aula cada grupo deverá realizar as seguintes melhorias: 

1º grupo: acrescentar uma mensagem de confirmação ao deletar uma tarefa.
2º grupo: realizar a paginação dos resultados.
3º grupo: acrescentar um checkbox para que uma tarefa tenha o seus status alterado para realizado ou não realizado.
4º grupo: determinar que um tarefa está realizada ou se está atrasada, estilizando com CSS.
5º grupo: definir atalhos do teclado para incluir, alterar ou deletar uma nova tarefa.
6º grupo: 

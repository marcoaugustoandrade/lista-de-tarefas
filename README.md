GET /api/v1/tarefas/:filtro?
* Caso existam tarefas com o filtro especificado:
  (200) OK
* Caso não exista tarefas com o filtro especificado:
  (204) NoContent
  (404) Not Found
* Em caso de erro:
    (500) Internal Server Error

GET /api/v1/tarefas/:id
* Caso a tarefa exista:
  (200) OK
* Caso a tarefa não exista:
  (404) Not Found
* Em caso de erro:
    (500) Internal Server Error

POST /api/v1/tarefas
* Em caso de sucesso:
  (201) Created
  * Em caso de erro:
    (500) Internal Server Error

PUT /api/v1/tarefas
* Em caso de sucesso:
  (202) Accepted
* Caso a tarefa a ser atualizada não seja encontrada:
  (404) Not Found
* Em caso de erro:
  (500) Internal Server Error

DELETE /api/v1/tarefas/:id
* Em caso de sucesso:
  (200) OK
* Caso a tarefa não seja encontrada:
  (404) Not Found
* Em caso de erro:
    (500) Internal Server Error


dotenv
nodemon

nedb
mysql
express
body-parser
cors
morgan

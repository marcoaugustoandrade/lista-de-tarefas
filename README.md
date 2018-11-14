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
docker-compose up db
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

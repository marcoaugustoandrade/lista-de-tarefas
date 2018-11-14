const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT;
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

// Documentação
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

// Configurando
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended: true} ));
app.use(morgan('combined'));
app.use(cors());

// Rotas
const index = require('./routes/index');
app.use('/api/v1', index);
const tarefasRouter = require('./routes/tarefaRouter');
app.use('/api/v1/tarefas', tarefasRouter);
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Subindo o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

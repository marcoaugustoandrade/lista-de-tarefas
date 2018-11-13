const express = require('express');
const router = express.Router();
const tarefaController = require('../controllers/tarefaController');

router.get('/', tarefaController.listarTodos);
router.get('/f/:descricao?', tarefaController.listarPorDescricao);
router.get('/:id', tarefaController.listarPorId);
router.post('/', tarefaController.inserir);
router.put('/:id', tarefaController.alterar);
router.delete('/:id', tarefaController.deletar);

module.exports = router;

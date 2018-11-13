const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200)
  res.json({
    message: "API tarefas v1"
  });
})

module.exports = router;

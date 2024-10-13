const express = require('express')
const router = express.Router()
const salleController = require('../controllers/Salle.controller')

router.get('/', salleController.getAll);
router.get('/:id',salleController.getSalleById)
router.post('/',salleController.create);
router.put('/:id', salleController.update);
router.delete('/:id', salleController.delete);


module.exports = router;
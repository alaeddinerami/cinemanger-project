const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController'); 
const auth = require('../middlewares/auth');

router.get('/admin/all',auth(['admin']), UserController.getAllAdmin);
router.get('/admin/:id',auth(['admin']), UserController.getAdminById);
router.post('/admin/create',auth(['admin']), UserController.create);
router.put('/admin/:id',auth(['admin']), UserController.update);
router.delete('/admin/:id',auth(['admin']), UserController.delete);

router.post('/register', UserController.register);
router.post('/login', UserController.login);


module.exports = router;

const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

// Rutas para transacciones
router.get('/', transactionController.getTransactions);
router.post('/', transactionController.createTransaction);
router.delete('/:id', transactionController.deleteTransaction);
router.get('/balance', transactionController.getBalance);

module.exports = router;
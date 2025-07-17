const Transaction = require('../models/Transaction');

// Obtener todas las transacciones
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Crear una transacción
exports.createTransaction = async (req, res) => {
  const transaction = new Transaction({
    type: req.body.type,
    amount: req.body.amount,
    category: req.body.category,
    description: req.body.description,
    budget: req.body.budget,
  });

  try {
    const newTransaction = await transaction.save();
    res.status(201).json(newTransaction);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Eliminar una transacción
exports.deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(req.params.id);
    if (!transaction) return res.status(404).json({ message: 'Transacción no encontrada' });
    res.json({ message: 'Transacción eliminada' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Obtener balance financiero
exports.getBalance = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    const incomes = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    const expenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    const balance = incomes - expenses;

    res.json({ incomes, expenses, balance });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
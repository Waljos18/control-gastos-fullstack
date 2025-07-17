const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  type: { type: String, enum: ['income', 'expense'], required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  description: { type: String },
  date: { type: Date, default: Date.now },
  budget: { type: Number }, // Presupuesto asignado a la categoría (opcional)
});

module.exports = mongoose.model('Transaction', transactionSchema);
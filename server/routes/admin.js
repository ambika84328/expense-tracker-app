const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expense'); // Updated controller name

router.get('/', expenseController.getExpenses);
router.post('/', expenseController.postAddExpense);
router.get('/edit/:expenseId', expenseController.getEditExpense);
router.put('/edit/:expenseId', expenseController.putEditExpense);
router.delete('/delete/:expenseId', expenseController.deleteExpense);

module.exports = router;

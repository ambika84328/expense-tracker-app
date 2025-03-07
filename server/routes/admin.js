const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expense');
const userController = require('../controllers/user');

router.post("/expense", expenseController.addExpense);
router.get("/expense", expenseController.getExpenses);
router.put("/expense/:id", expenseController.updateExpense);
router.delete("/expense/:id", expenseController.deleteExpense);

router.get('/user', userController.getUser);
router.post('/user/sign-up', userController.createUser);
router.post('/user/sign-in', userController.verifyUser);
router.put('/user/:id', userController.updateUser);
router.delete('/user/:id', userController.deleteUser);

module.exports = router;

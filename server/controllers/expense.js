const Expense = require('../models/expense'); // Renamed model

// POST - Add a new expense
exports.postAddExpense = async (req, res, next) => {
  console.log(req.body);
  try {
    const { name, amount } = req.body;

    const expense = await Expense.create({
      name: name,
      amount: amount
    });

    console.log('Created Expense');
    res.status(201).json({ message: 'Expense created successfully', expense: expense }); // 201 Created status
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating expense', error: err.message }); // 500 Internal Server Error
  }
};

// GET - Fetch a single expense for editing
exports.getEditExpense = async (req, res, next) => {
  const expenseId = req.params.expenseId;

  try {
    const expense = await Expense.findByPk(expenseId);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' }); // 404 Not Found
    }

    res.status(200).json({ expense: expense });  // 200 OK
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching expense', error: err.message }); // 500 Internal Server Error
  }
};

// PUT - Update an existing expense
exports.putEditExpense = async (req, res, next) => {  
  const expenseId = req.params.expenseId;
  const { name, amount } = req.body;

  try {
    const expense = await Expense.findByPk(expenseId);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });  // 404 Not Found
    }

    expense.name = name;
    expense.amount = amount;

    await expense.save();

    console.log('Expense updated');
    res.status(200).json({ message: 'Expense updated successfully', expense: expense }); // 200 OK
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating expense', error: err.message });  // 500 Internal Server Error
  }
};

// GET - Fetch all expenses
exports.getExpenses = async (req, res, next) => {
  try {
    const expenses = await Expense.findAll();
    res.status(200).json({ expenses: expenses });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching expenses', error: err.message }); // 500 Internal Server Error
  }
};

// DELETE - Delete an expense
exports.deleteExpense = async (req, res, next) => {  
  const expenseId = req.params.expenseId;

  try {
    const expense = await Expense.findByPk(expenseId);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' }); // 404 Not Found
    }

    await expense.destroy();

    console.log('Deleted Expense');
    res.status(200).json({ message: 'Expense deleted successfully' }); // 200 OK
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting expense', error: err.message }); // 500 Internal Server Error
  }
};

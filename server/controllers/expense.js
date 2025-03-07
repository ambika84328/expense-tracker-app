const Expense = require("../models/expense"); // Import Expense model

// POST - Add or update an expense
exports.addExpense = async (req, res, next) => {
  console.log(req.body);
  try {
    const { item, category, amount } = req.body;

    // Ensure the amount is a valid number
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount)) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    // Check if an expense with the same item exists
    let existingExpense = await Expense.findOne({ where: { item } });

    if (existingExpense) {
      // If an expense with the same item exists, update it
      existingExpense.amount = parsedAmount; // ✅ Overwrite instead of adding
      existingExpense.category = category;
      await existingExpense.save();
      console.log("Updated Expense");
      return res.status(200).json({ message: "Expense updated successfully", expense: existingExpense });
    }

    // Create a new expense
    const newExpense = await Expense.create({ item, category, amount: parsedAmount });
    console.log("Created New Expense");
    res.status(201).json({ message: "Expense created successfully", expense: newExpense });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating/updating expense", error: err.message });
  }
};

// PUT - Update an existing expense by ID
exports.updateExpense = async (req, res, next) => {
  try {
    const expenseId = req.params.id;
    const { item, category, amount } = req.body;

    // Find the expense by ID
    let expense = await Expense.findByPk(expenseId);
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    // Ensure the amount is correctly updated without adding
    expense.item = item || expense.item;
    expense.category = category || expense.category;
    if (amount !== undefined) {
      const parsedAmount = parseFloat(amount);
      if (!isNaN(parsedAmount)) {
        expense.amount = parsedAmount; // ✅ Overwrite instead of adding
      }
    }

    await expense.save();
    console.log("Updated Expense");

    res.status(200).json({ message: "Expense updated successfully", expense });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating expense", error: err.message });
  }
};

// GET - Fetch all expenses
exports.getExpenses = async (req, res, next) => {
  try {
    const expenses = await Expense.findAll();
    res.status(200).json({ expenses });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching expenses", error: err.message });
  }
};

// DELETE - Delete an expense by ID
exports.deleteExpense = async (req, res, next) => {
  try {
    const expenseId = req.params.id;

    const expense = await Expense.findByPk(expenseId);
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    await expense.destroy();
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting expense", error: err.message });
  }
};
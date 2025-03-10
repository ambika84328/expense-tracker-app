const { Expense } = require('../models/association');

// POST - Add or update an expense (linked to userId)
exports.addExpense = async (req, res) => {
  try {
    const userId = req.user.id; // Get userId from middleware
    const { item, category, amount } = req.body;

    // Ensure the amount is a valid number
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount)) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    // Check if an expense with the same item exists for this user
    let existingExpense = await Expense.findOne({ where: { item, userId } });

    console.log("exisitngExpense", existingExpense);

    if (existingExpense) {
      // Update existing expense
      existingExpense.amount = parsedAmount;
      existingExpense.category = category;
      await existingExpense.save();
      console.log("Updated Expense");
      return res.status(200).json({ message: "Expense updated successfully", expense: existingExpense });
    }

    // Create a new expense linked to userId
    const newExpense = await Expense.create({ item, category, amount: parsedAmount, userId });
    console.log("Created New Expense");

    res.status(201).json({ message: "Expense created successfully", expense: newExpense });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating/updating expense", error: err.message });
  }
};

// PUT - Update an existing expense by ID (linked to userId)
exports.updateExpense = async (req, res) => {
  try {
    const userId = req.user.id; // Get userId
    const expenseId = req.params.id;
    const { item, category, amount } = req.body;

    // Find the expense by ID and userId
    let expense = await Expense.findOne({ where: { id: expenseId, userId } });
    if (!expense) {
      return res.status(404).json({ message: "Expense not found or unauthorized" });
    }

    // Update fields
    expense.item = item || expense.item;
    expense.category = category || expense.category;
    if (amount !== undefined) {
      const parsedAmount = parseFloat(amount);
      if (!isNaN(parsedAmount)) {
        expense.amount = parsedAmount;
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

// GET - Fetch all expenses for the logged-in user
exports.getExpenses = async (req, res) => {
  try {
    const userId = req.user.id; // Get userId
    const expenses = await Expense.findAll({ where: { userId } });
    
    res.status(200).json({ expenses });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching expenses", error: err.message });
  }
};

// DELETE - Delete an expense by ID (only if it belongs to the user)
exports.deleteExpense = async (req, res) => {
  try {
    const userId = req.user.id; // Get userId
    const expenseId = req.params.id;

    // Find the expense by ID and userId
    const expense = await Expense.findOne({ where: { id: expenseId, userId } });
    if (!expense) {
      return res.status(404).json({ message: "Expense not found or unauthorized" });
    }

    await expense.destroy();
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting expense", error: err.message });
  }
};

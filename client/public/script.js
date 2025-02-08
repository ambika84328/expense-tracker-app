const expenseForm = document.getElementById('expenseForm');
const expenseTableBody = document.getElementById('expenseTableBody');

// Fetch all expenses from API
const fetchExpenses = async () => {
    try {
        const response = await fetch('http://localhost:3000/');
        const data = await response.json();
        return data.expenses || []; // Assuming API returns { users: [...] }
    } catch (error) {
        console.error('Error fetching expenses:', error);
        return [];
    }
};

// Delete an expense
const deleteExpense = async (expenseId) => {
    try {
        await fetch(`http://localhost:3000/delete/${expenseId}`, { method: 'DELETE' });
        renderExpenses();
    } catch (error) {
        console.error('Error deleting expense:', error);
    }
};

// Edit an expense (populate form for editing)
const editExpense = async (expenseId) => {
    try {
        const response = await fetch(`http://localhost:3000/edit/${expenseId}`);
        const data = await response.json();
        
        document.getElementById('name').value = data.expense.name; // Assuming "username" is now "name"
        document.getElementById('amount').value = data.expense.amount; // Assuming "phone" is now "amount"
        
        deleteExpense(expenseId);
    } catch (error) {
        console.error('Error editing expense:', error);
    }
};

// Render expenses in table
const renderExpenses = async () => {
    const expenses = await fetchExpenses();
    expenseTableBody.innerHTML = '';

    expenses.forEach((expense) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${expense.name}</td>
            <td>${expense.amount}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editExpense('${expense.id}')">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteExpense('${expense.id}')">Delete</button>
            </td>
        `;
        expenseTableBody.appendChild(row);
    });
};

// Handle form submission (Add new expense)
expenseForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const amount = document.getElementById('amount').value;

    try {
        const response = await fetch('http://localhost:3000/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name, amount: amount }) // Assuming API still expects these keys
        });

        console.log('Response:', response);
        
        renderExpenses();
        expenseForm.reset();
    } catch (error) {
        console.error('Error adding expense:', error);
    }
});

// Initial render
renderExpenses();

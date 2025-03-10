const User = require('./User');
const Expense = require('./expense');

Expense.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Expense, { foreignKey: 'userId' });

module.exports = { User, Expense };

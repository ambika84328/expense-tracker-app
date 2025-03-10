const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Expense = sequelize.define("Expense", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  item: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  amount: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  userId: { 
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'Users', // Use string here instead of importing User
      key: "id"
    },
    onDelete: "CASCADE"
  }
}, {
  timestamps: false,
  tableName: "Expenses"
});

module.exports = Expense;
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
  }
},
{
  timestamps: false
});

module.exports = Expense;

const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Order = sequelize.define("Order", {
  id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
  },
  amount: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  customerId: { 
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', // Use string here instead of importing User
        key: "id"
      },
      onDelete: "CASCADE"
  },
  customerPhone: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
  }
},
{
  timestamps: false,
  tableName: "Orders"
});

module.exports = Order;

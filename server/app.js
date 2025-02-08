const path = require('path');
const cors = require('cors');

const express = require('express');
const bodyParser = require('body-parser');

const sequelize = require('./utils/database');

const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3001' }));

const adminRoutes = require('./routes/admin');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(adminRoutes);

sequelize
  .sync()
  .then(result => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });

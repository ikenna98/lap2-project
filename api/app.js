const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the Habit Tracker API!')
});

const userRoutes = require('./routes/usersRoutes');

app.use('/users', userRoutes);

module.exports = app

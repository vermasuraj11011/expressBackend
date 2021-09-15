console.log('intro to the express');
const express = require('express');
const user = require('./user.json');

const app = express();

app.get('/', (req, res) => {
	res.send('Welcome to Home page');
});
app.get('/user', (req, res) => {
	res.send(user);
});

app.listen(2333, () => {
	console.log('listerning to the port 2333');
});

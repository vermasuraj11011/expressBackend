const e = require('express');
const express = require('express');
const book = require('./book.json');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
	res.send(book);
});

app.post('/books', append, (req, res) => {
	res.send(req.body);
});

function append(req, res, next) {
	book.push(req.body);
	next();
}

app.get('/books/:id', (req, res) => {
	const id = req.params.id;
	// console.log(id.id == '10');
	// console.log(id);

	let find = false;
	let x;
	book.forEach((element) => {
		// console.log(element.id);
		if (id == element.id) {
			find = true;
			x = element;
		}
	});

	if (find) {
		res.send(x);
	} else {
		res.send('id not found');
	}
});

app.patch('/books/:id', getChange({ author: 'req', published_year: 'req' }), (req, res) => {
	const id = req.params.id;
	const author = req.query.author;
	const year = req.query.published_year;

	let find = false;
	let x;
	book.forEach((element) => {
		if (element.id == id) {
			element.author = author;
			element.published_year = year;
			find = true;
			x = element;
		}
	});

	if (find) {
		res.send(x);
	} else {
		res.send('please enter the valid id');
	}
});

function getChange(data) {
	return function(req, res, next) {
		Object.keys(data).forEach(function(item) {
			if (!req.query[item]) {
				res.send(`please enter ${item}`);
			}
		});
		next();
	};
}

app.delete('/books/:id', (req, res) => {
	const id = parseInt(req.params.id);
	// const { id } = req.params;
	console.log('id ', id);
	// console.log('typeof(id):', typeof id);
	book.splice(id - 1, 1);
	res.send(book);
	// console.log(book[id]);
	// console.log(book);
});

app.listen(5000, () => {
	console.log('listerning to the port 5000');
});

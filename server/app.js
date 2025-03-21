const express = require('express');
const path = require('path');

const app = express();

app.use('/', express.static(path.resolve(__dirname, '../src')));
app.use('/', express.static(path.resolve(__dirname, '../node_modules')));

const port = 8000;

app.listen(port, () => {
	console.log(`Server listening port ${port}`);
});

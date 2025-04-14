import express, { Express } from 'express';
import path from 'path';

const app: Express = express();

app.use('/', express.static(path.resolve(__dirname, '../src')));
app.use('/', express.static(path.resolve(__dirname, '../node_modules')));
// app.use('/', express.static(path.resolve(__dirname, '../dist')));

const port: number = 8000;

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});

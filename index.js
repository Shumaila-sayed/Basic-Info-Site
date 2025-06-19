import express from 'express';
// import http from 'http';
import url from 'url';
import path from 'path';
import fs from 'fs/promises';
const app = express();
const PORT = 3000;

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// const server = http.createServer(async(req, res) => {
// 	let filePath;
// 	if (req.url === '/') {
// 		filePath = path.join(__dirname, 'index.html');
// 	} else if (req.url === '/about') {
// 		filePath = path.join(__dirname, 'about.html');
// 	} else if (req.url === '/contact-me') {
// 		filePath = path.join(__dirname, 'contact-me.html');
// 	} else {
// 		filePath = path.join(__dirname, '404.html');
//     }

//     const data = await fs.readFile(filePath);
//     res.setHeader('Content-type', 'text.html');
//     res.write(data);
//     res.end();
// });

const serveHTMl = async (res, fileName) => {
	try {
		const filePath = path.join(__dirname, fileName);
		const data = await fs.readFile(filePath);
		res.setHeader('Content-type', 'text/html');
		res.send(data);
	} catch (error) {
		res.status(500).send('Server Error');
	}
};

app.get('/', async (req, res) => {
	await serveHTMl(res, 'index.html');
});

app.get('/about', async (req, res) => {
	await serveHTMl(res, 'about.html');
});

app.get('/contact-me', async (req, res) => {
	await serveHTMl(res, 'contact-me.html');
});

app.use(async (req, res) => {
	await serveHTMl(res, '404.html');
});

app.listen(PORT, () => {
	console.log(`Listening to the port ${PORT}`);
});

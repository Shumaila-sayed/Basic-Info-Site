import http from 'http';
import url from 'url';
import path from 'path';
import fs from 'fs/promises';
const PORT = 8080;

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = http.createServer(async(req, res) => {
	let filePath;
	if (req.url === '/') {
		filePath = path.join(__dirname, 'index.html');
	} else if (req.url === '/about') {
		filePath = path.join(__dirname, 'about.html');
	} else if (req.url === '/contact-me') {
		filePath = path.join(__dirname, 'contact-me.html');
	} else {
		filePath = path.join(__dirname, '404.html');
    }
    
    const data = await fs.readFile(filePath);
    res.setHeader('Content-type', 'text.html');
    res.write(data);
    res.end();
});

server.listen(PORT, () => {
    console.log(`Listening to the port ${PORT}`);
    
})

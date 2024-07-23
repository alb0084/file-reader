import { createServer } from 'http';
import { FileController } from './controller/fileController';
import * as fs from 'fs';
import * as path from 'path';

const port = 3000;

const server = createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    if (req.method === 'POST' && req.url === '/analyze') {
        FileController.analyze(req, res);
    } else if (req.method === 'GET') {
        const requestedUrl = req.url || '/';
        const publicPath = path.join(__dirname, '../../../dist/frontend');
        let filePath = path.join(publicPath, requestedUrl === '/' ? 'index.html' : requestedUrl);

        // Ensure file path is correct
        filePath = decodeURI(filePath);

        console.log('Public path:', publicPath);
        console.log('Requested URL:', requestedUrl);
        console.log('File path:', filePath);

        // Listing the files in the publicPath to ensure they are there
        fs.readdir(publicPath, (err, files) => {
            if (err) {
                console.error('Error reading public path:', err);
            } else {
                console.log('Files in public path:', files);
            }
        });

        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.error('Error reading file:', err);
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Not Found');
                return;
            }

            const ext = path.extname(filePath);
            let contentType = 'text/html';
            switch (ext) {
                case '.js':
                    contentType = 'application/javascript';
                    break;
                case '.css':
                    contentType = 'text/css';
                    break;
                case '.json':
                    contentType = 'application/json';
                    break;
                case '.png':
                    contentType = 'image/png';
                    break;
                case '.jpg':
                    contentType = 'image/jpg';
                    break;
                default:
                    contentType = 'text/html';
            }

            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

import { IncomingMessage, ServerResponse } from 'http';
import * as fs from 'fs';
import * as path from 'path';
// const fetch = require('node-fetch');
import fetch from 'node-fetch';


export class FileController {
    static async analyze(req: IncomingMessage, res: ServerResponse) {
        let body = '';
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', async () => {
            const data = JSON.parse(body);
            if (data.content) {
                const analysis = analyzeContent(data.content);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(analysis));
            } else if (data.path) {
                try {
                    console.log(`Fetching file from URL or path: ${data.path}`);
                    let text;
                    if (data.path.startsWith('http://') || data.path.startsWith('https://')) {
                        const response = await fetch(data.path);
                        console.log(`Response status: ${response.status}`);
                        if (!response.ok) {
                            console.error(`Error fetching the file: ${response.statusText}`);
                            throw new Error('Error fetching the file');
                        }
                        text = await response.text();
                    } else {
                        text = fs.readFileSync(path.resolve(data.path), 'utf8');
                    }
                    const analysis = analyzeContent(text);
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(analysis));
                } catch (error: any) {
                    console.error(`Error: ${error.message}`);
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Error fetching the file');
                }
            } else {
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end('Invalid request');
            }
        });
    }
}

export function analyzeContent(content: string) {
    const wordCount = content.split(/\s+/).length;
    const letterCount = content.replace(/\s+/g, '').length;
    const spaceCount = (content.match(/\s/g) || []).length;

    const frequentWords = content
        .toLowerCase()
        .split(/\s+/)
        .reduce((acc: { [key: string]: number }, word: string) => {
            acc[word] = (acc[word] || 0) + 1;
            return acc;
        }, {});

    const filteredFrequentWords = Object.keys(frequentWords)
        .filter(word => frequentWords[word] > 10)
        .reduce((acc: { [key: string]: number }, word: string) => {
            acc[word] = frequentWords[word];
            return acc;
        }, {});

    return { wordCount, letterCount, spaceCount, frequentWords: filteredFrequentWords };
}

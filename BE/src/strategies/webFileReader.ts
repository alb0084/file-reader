import { FileReaderStrategy } from './fileReaderStrategy';
const fetch = require('node-fetch');

export class WebFileReader implements FileReaderStrategy {
    async readFile(path: string): Promise<string> {
        try {
            console.log(`Fetching file from URL: ${path}`);
            const response = await fetch(path);
            console.log(`Response status: ${response.status}`);
            if (!response.ok) {
                console.error(`Failed to fetch file from ${path}: ${response.statusText}`);
                throw new Error(`Failed to fetch file from ${path}: ${response.statusText}`);
            }
            const data = await response.text();
            console.log(`Fetched data length: ${data.length}`);
            return data;
        } catch (error: any) {
            console.error(`Error fetching the file: ${error.message}`);
            throw new Error(`Failed to fetch file from ${path}: ${error.message}`);
        }
    }
}

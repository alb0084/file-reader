import { FileReaderStrategy } from './fileReaderStrategy';
import * as fs from 'fs/promises';

export class LocalFileReader implements FileReaderStrategy {
    async readFile(path: string): Promise<string> {
        return await fs.readFile(path, 'utf-8');
    }
}

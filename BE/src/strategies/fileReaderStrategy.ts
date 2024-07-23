export interface FileReaderStrategy {
    readFile(path: string): Promise<string>;
}

import { analyzeContent } from '../src/controller/fileController';

describe('analyzeContent', () => {
    it('should correctly count words', () => {
        const content = 'hello world';
        const result = analyzeContent(content);
        expect(result.wordCount).toBe(2);
    });

    it('should correctly count letters', () => {
        const content = 'hello world';
        const result = analyzeContent(content);
        expect(result.letterCount).toBe(10);
    });

    it('should correctly count spaces', () => {
        const content = 'hello world';
        const result = analyzeContent(content);
        expect(result.spaceCount).toBe(1);
    });

    it('should correctly identify frequent words', () => {
        const content = 'test test test test test test test test test test test';
        const result = analyzeContent(content);
        expect(result.frequentWords).toEqual({ test: 11 });
    });

    it('should only include words that appear more than 10 times', () => {
        const content = 'test test test test test test test test test test test example example example';
        const result = analyzeContent(content);
        expect(result.frequentWords).toEqual({ test: 11 });
        expect(result.frequentWords['example']).toBeUndefined();
    });
});

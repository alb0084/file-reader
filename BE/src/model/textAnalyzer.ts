export class TextAnalyzer {
    static analyzeText(text: string) {
        const wordCounts: { [key: string]: number } = {};
        const words = text.split(/\s+/);
        const letters = text.replace(/\s/g, '');
        const spaces = text.split(' ').length - 1;

        words.forEach(word => {
            wordCounts[word] = (wordCounts[word] || 0) + 1;
        });

        const frequentWords = Object.entries(wordCounts)
            .filter(([, count]) => count > 10)
            .map(([word, count]) => ({ word, count }));

        return {
            totalWords: words.length,
            totalLetters: letters.length,
            totalSpaces: spaces,
            frequentWords,
        };
    }
}

<template>
  <div id="app">
    <header>
      <h1>File Analyzer</h1>
    </header>
    <section class="container">
      <div>
        <label>
          <input type="radio" value="file" v-model="inputType" /> File
        </label>
        <label>
          <input type="radio" value="url" v-model="inputType" /> URL
        </label>
      </div>
      <div v-if="inputType === 'file'">
        <input type="file" @change="handleFileUpload" />
      </div>
      <div v-if="inputType === 'url'">
        <input type="text" v-model="filePath" placeholder="Enter file path or URL" />
      </div>
      <button @click="analyzeFile">Analyze</button>
    </section>
    <section class="container" v-if="analysis">
      <h2>Analysis Result</h2>
      <p><strong>Word Count:</strong> {{ analysis.wordCount }}</p>
      <p><strong>Letter Count:</strong> {{ analysis.letterCount }}</p>
      <p><strong>Space Count:</strong> {{ analysis.spaceCount }}</p>
      <h3>Frequent Words</h3>
      <ul>
        <li v-for="(count, word) in analysis.frequentWords" :key="word">{{ word }}: {{ count }}</li>
      </ul>
    </section>
    <section class="container" v-if="error">
      <h2>Error</h2>
      <p>{{ error }}</p>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      inputType: 'url', // 'file' or 'url'
      filePath: '',
      fileContent: '',
      analysis: null,
      error: null
    };
  },
  methods: {
    handleFileUpload(event: Event) {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          this.fileContent = reader.result as string;
        };
        reader.readAsText(file);
      }
    },
    async analyzeFile() {
      try {
        let body;
        if (this.inputType === 'file') {
          body = { content: this.fileContent };
        } else {
          body = { path: this.filePath };
        }

        const response = await fetch('http://localhost:3000/analyze', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        });
        if (!response.ok) {
          throw new Error('Failed to analyze file');
        }
        this.analysis = await response.json();
        this.error = null;
      } catch (err: any) {
        this.error = err.message;
        this.analysis = null;
      }
    }
  }
});
</script>
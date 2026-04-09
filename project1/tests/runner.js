#!/usr/bin/env node

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const testFiles = [
  'tasksReducer.test.js',
  'debounce.test.js',
  'clone.test.js',
  'deepEqual.test.js'
];

console.log('Running all tests...\n');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

const runTest = (file, index) => {
  return new Promise((resolve) => {
    const child = spawn('node', [join(__dirname, file)], {
      stdio: 'inherit'
    });

    child.on('close', (code) => {
      resolve(code);
    });
  });
};

(async () => {
  for (let i = 0; i < testFiles.length; i++) {
    await runTest(testFiles[i], i);
  }
  
  console.log('\n✓ All tests completed');
})();

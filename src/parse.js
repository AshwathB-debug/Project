const fs = require('fs');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;

// Read your TSX file
const code = fs.readFileSync('App.tsx', 'utf8');

// Parse the code into an AST
const ast = parser.parse(code, {
  sourceType: 'module',
  plugins: ['typescript', 'jsx'],
});

const texts = [];

// Traverse AST to extract text nodes from JSX
traverse(ast, {
  JSXText(path) {
    const text = path.node.value.trim();
    if (text) texts.push(text);
  }
});

console.log(texts);

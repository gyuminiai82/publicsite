const fs = require('fs');
const data = JSON.parse(fs.readFileSync('C:\\\\Users\\\\darkk\\\\.mcp-figma\\\\cache\\\\file_nodes_sG3ex19uVrhKu2jn5YLaUK_1778570600609.json', 'utf8'));
const node = data.nodes['356:2441'].document;

function printTree(n, indent='') {
  let line = indent + n.name + ' (' + n.type + ')';
  if(n.type === 'TEXT') line += ' "' + n.characters.replace(/\\n/g, ' ') + '"';
  console.log(line);
  if(n.children) {
    n.children.forEach(c => printTree(c, indent + '  '));
  }
}

printTree(node);

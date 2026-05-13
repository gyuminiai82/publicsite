const fs = require('fs');

const data = JSON.parse(fs.readFileSync('C:\\Users\\darkk\\.mcp-figma\\cache\\file_nodes_sG3ex19uVrhKu2jn5YLaUK_1778557214182.json', 'utf8'));

const extractText = (node, indent = '') => {
  let output = '';
  if (node.type === 'TEXT') {
    output += `${indent}- [TEXT] ${node.characters}\n`;
  } else if (node.type === 'INSTANCE' || node.type === 'FRAME' || node.type === 'GROUP') {
    output += `${indent}- [${node.type}] ${node.name}\n`;
  }
  
  if (node.children) {
    node.children.forEach(child => {
      output += extractText(child, indent + '  ');
    });
  }
  return output;
};

const findNode = (node, id) => {
  if (node.id === id) return node;
  if (node.children) {
    for (const child of node.children) {
      const found = findNode(child, id);
      if (found) return found;
    }
  }
  return null;
};

const rootNode = data.nodes['110:772'] ? data.nodes['110:772'].document : null;
if (rootNode) {
  const footerNode = findNode(rootNode, '271:468');
  if (footerNode) {
    console.log(extractText(footerNode));
  } else {
    console.log("Footer node 271:468 not found");
  }
} else {
  console.log("Root node not found");
}

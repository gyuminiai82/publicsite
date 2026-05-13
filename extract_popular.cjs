const fs = require('fs');
const data = JSON.parse(fs.readFileSync('C:\\Users\\darkk\\.mcp-figma\\cache\\file_nodes_sG3ex19uVrhKu2jn5YLaUK_1778564601747.json', 'utf8'));

const extractLayout = (node, indent = '') => {
  let output = '';
  if (node.type === 'TEXT') {
    output += `${indent}- [TEXT] "${node.characters}" (fontSize: ${node.style?.fontSize}, fontWeight: ${node.style?.fontWeight}, color: ${JSON.stringify(node.fills?.[0]?.color)})\n`;
  } else if (node.type === 'VECTOR') {
    output += `${indent}- [VECTOR] ${node.name} (fills: ${JSON.stringify(node.fills?.[0]?.color)})\n`;
  } else {
    output += `${indent}- [${node.type}] ${node.name} (layoutMode: ${node.layoutMode}, itemSpacing: ${node.itemSpacing})\n`;
  }
  
  if (node.children) {
    node.children.forEach(child => {
      output += extractLayout(child, indent + '  ');
    });
  }
  return output;
};

const rootNode = data.nodes['273:1370'] ? data.nodes['273:1370'].document : null;
if (rootNode) {
  // Find the popular searches section
  let popularNode = null;
  const findPopular = (node) => {
    if (node.name === 'wrap:latest' && node.children && node.children[0].characters === '인기검색어') popularNode = node;
    if (!popularNode && node.children) node.children.forEach(findPopular);
  };
  findPopular(rootNode);
  
  if (popularNode) {
    console.log(extractLayout(popularNode));
  } else {
    console.log("popular section not found");
  }
}

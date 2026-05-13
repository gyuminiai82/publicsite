const fs = require('fs');
const data = JSON.parse(fs.readFileSync('C:\\Users\\darkk\\.mcp-figma\\cache\\file_sG3ex19uVrhKu2jn5YLaUK_1778567930427.json', 'utf8'));

const extractLayout = (node, indent = '') => {
  let output = '';
  if (node.type === 'TEXT') {
    output += `${indent}- [TEXT] "${node.characters}" (fontSize: ${node.style?.fontSize}, fontWeight: ${node.style?.fontWeight}, color: ${JSON.stringify(node.fills?.[0]?.color)})\n`;
  } else {
    output += `${indent}- [${node.type}] ${node.name} (layoutMode: ${node.layoutMode}, itemSpacing: ${node.itemSpacing}, padding: ${node.paddingTop}/${node.paddingRight}/${node.paddingBottom}/${node.paddingLeft}, fills: ${JSON.stringify(node.fills?.[0]?.color)})\n`;
  }
  
  if (node.children) {
    node.children.forEach(child => {
      output += extractLayout(child, indent + '  ');
    });
  }
  return output;
};

const rootNode = data.nodes['356:2248'] ? data.nodes['356:2248'].document : null;
if (rootNode) {
  console.log(extractLayout(rootNode));
} else {
  console.log("Node 356:2248 not found");
}

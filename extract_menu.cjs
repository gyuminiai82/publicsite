const fs = require('fs');
const data = JSON.parse(fs.readFileSync('C:\\Users\\darkk\\.mcp-figma\\cache\\file_nodes_sG3ex19uVrhKu2jn5YLaUK_1778566618281.json', 'utf8'));

const extractLayout = (node, indent = '') => {
  let output = '';
  if (node.type === 'TEXT') {
    output += `${indent}- [TEXT] "${node.characters}" (fontSize: ${node.style?.fontSize}, fontWeight: ${node.style?.fontWeight})\n`;
  } else {
    output += `${indent}- [${node.type}] ${node.name} (layoutMode: ${node.layoutMode}, padding: ${node.paddingTop}/${node.paddingRight}/${node.paddingBottom}/${node.paddingLeft})\n`;
    if (node.strokes && node.strokes.length > 0) {
       output += `${indent}  - Stroke: ${node.strokeWeight}px, type: ${node.strokeAlign}\n`;
    }
  }
  
  if (node.children) {
    node.children.forEach(child => {
      output += extractLayout(child, indent + '  ');
    });
  }
  return output;
};

const rootNode = data.nodes['273:1218'] ? data.nodes['273:1218'].document : null;
if (rootNode) {
  console.log(extractLayout(rootNode));
} else {
  console.log("Node 273:1218 not found");
}

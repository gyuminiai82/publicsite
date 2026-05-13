const fs = require('fs');

const data = JSON.parse(fs.readFileSync('C:\\Users\\darkk\\.mcp-figma\\cache\\file_nodes_sG3ex19uVrhKu2jn5YLaUK_1778557214182.json', 'utf8'));

const extractInteractions = (node, path = '') => {
  const currentPath = path ? `${path} > ${node.name}(${node.id})` : `${node.name}(${node.id})`;
  
  if (node.interactions && node.interactions.length > 0) {
    console.log(`\n--- Interactions on ${currentPath} ---`);
    node.interactions.forEach(interaction => {
      console.log(JSON.stringify(interaction, null, 2));
    });
  }

  if (node.children) {
    node.children.forEach(child => extractInteractions(child, currentPath));
  }
};

if (data.nodes['110:772']) {
    extractInteractions(data.nodes['110:772'].document);
} else {
    console.log("Node 110:772 not found in cache");
}

const fs = require('fs');
const data = JSON.parse(fs.readFileSync('C:\\Users\\darkk\\.mcp-figma\\cache\\file_nodes_sG3ex19uVrhKu2jn5YLaUK_1778557214182.json', 'utf8'));

const findNodeByName = (node, name) => {
  if (node.name && node.name.toLowerCase().includes(name.toLowerCase())) return node;
  if (node.children) {
    for (const child of node.children) {
      const found = findNodeByName(child, name);
      if (found) return found;
    }
  }
  return null;
};

const rootNode = data.nodes['110:772'] ? data.nodes['110:772'].document : null;
if (rootNode) {
  // Try to find the hero section or slider
  const heroNode = findNodeByName(rootNode, 'banner') || findNodeByName(rootNode, 'hero') || findNodeByName(rootNode, 'slide');
  if (heroNode) {
    console.log(`Node Name: ${heroNode.name}`);
    console.log(`BoundingBox:`, heroNode.absoluteBoundingBox);
    console.log(`Padding: paddingLeft=${heroNode.paddingLeft}, paddingTop=${heroNode.paddingTop}, paddingRight=${heroNode.paddingRight}, paddingBottom=${heroNode.paddingBottom}`);
    console.log(`ItemSpacing:`, heroNode.itemSpacing);
    console.log(`LayoutMode:`, heroNode.layoutMode);
    
    // Check children
    heroNode.children.forEach(c => {
      console.log(`  - Child: ${c.name}, absoluteBoundingBox:`, c.absoluteBoundingBox);
    });
  } else {
    console.log("Hero node not found");
  }
}

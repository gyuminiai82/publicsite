const fs = require('fs');

const data = JSON.parse(fs.readFileSync('C:\\Users\\darkk\\.mcp-figma\\cache\\file_nodes_sG3ex19uVrhKu2jn5YLaUK_1778557214182.json', 'utf8'));

const findImageRefs = (node) => {
  if (node.fills) {
    node.fills.forEach(fill => {
      if (fill.type === 'IMAGE' && fill.imageRef) {
        console.log(`ImageRef found: ${fill.imageRef} in node ${node.name} (${node.id})`);
      }
    });
  }
  if (node.children) {
    node.children.forEach(findImageRefs);
  }
};

const findVectors = (node) => {
    // We want to find the icons in the quick links section. They might be instances or vectors.
    if (node.name.includes('icon') || node.name.includes('아이콘') || node.name.includes('image')) {
        console.log(`Potential Icon/Image Node: ${node.name} (${node.id}) - Type: ${node.type}`);
    }
    if (node.children) {
        node.children.forEach(findVectors);
    }
}

if (data.nodes['110:772']) {
    console.log("--- Image Refs ---");
    findImageRefs(data.nodes['110:772'].document);
    console.log("--- Potential Icons ---");
    findVectors(data.nodes['110:772'].document);
} else {
    console.log("Node 110:772 not found in cache");
}

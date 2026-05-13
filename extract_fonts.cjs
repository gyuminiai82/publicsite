const fs = require('fs');

const dataFile = 'C:\\Users\\darkk\\.mcp-figma\\cache\\file_sG3ex19uVrhKu2jn5YLaUK_1778567930427.json';
const data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));

function extractFonts(node) {
  let texts = [];
  if (node.type === 'TEXT') {
    texts.push({
      text: node.characters.replace(/\n/g, ' ').substring(0, 30) + (node.characters.length > 30 ? '...' : ''),
      fontSize: node.style.fontSize,
      fontWeight: node.style.fontWeight,
      lineHeight: node.style.lineHeightPx ? Math.round(node.style.lineHeightPx) : 'auto'
    });
  }
  if (node.children) {
    node.children.forEach(c => {
      texts.push(...extractFonts(c));
    });
  }
  return texts;
}

const targetNodes = {
  'Mobile Main': '132:1057',
  'Tablet Main': '110:771',
  'Desktop Main': '110:770',
  'Mobile Menu': '132:1218',
  'Tablet Menu': '273:1218',
  'Mobile Search': '132:1229',
  'Tablet Search': '356:2248',
  'Desktop Search': '356:2314'
};

function findNodeById(node, id) {
  if (node.id === id) return node;
  if (node.children) {
    for (let c of node.children) {
      let found = findNodeById(c, id);
      if (found) return found;
    }
  }
  return null;
}

const result = {};
for (const [name, id] of Object.entries(targetNodes)) {
  const node = findNodeById(data.document, id);
  if (node) {
    // deduplicate texts with same style
    const texts = extractFonts(node);
    const unique = [];
    const seen = new Set();
    texts.forEach(t => {
      const key = `${t.text}-${t.fontSize}-${t.fontWeight}`;
      if (!seen.has(key)) {
        seen.add(key);
        unique.push(t);
      }
    });
    result[name] = unique;
  } else {
    result[name] = "Not found in cache";
  }
}

console.log(JSON.stringify(result, null, 2));

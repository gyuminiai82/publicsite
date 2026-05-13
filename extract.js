const fs = require('fs');

const path = 'C:\\Users\\darkk\\.mcp-figma\\cache\\file_nodes_sG3ex19uVrhKu2jn5YLaUK_1778557214182.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const colors = new Set();
const typography = new Set();
const radii = new Set();
const effects = new Set();

function toHex(c) {
    const r = Math.round(c.r * 255).toString(16).padStart(2, '0');
    const g = Math.round(c.g * 255).toString(16).padStart(2, '0');
    const b = Math.round(c.b * 255).toString(16).padStart(2, '0');
    return `#${r}${g}${b}`.toUpperCase();
}

function traverse(node) {
    if (!node) return;
    
    // Colors
    if (node.fills && Array.isArray(node.fills)) {
        node.fills.forEach(fill => {
            if (fill.type === 'SOLID' && fill.color) {
                colors.add(toHex(fill.color));
            }
        });
    }
    if (node.strokes && Array.isArray(node.strokes)) {
        node.strokes.forEach(stroke => {
            if (stroke.type === 'SOLID' && stroke.color) {
                colors.add(toHex(stroke.color));
            }
        });
    }

    // Typography
    if (node.type === 'TEXT' && node.style) {
        const s = node.style;
        typography.add(`Family: ${s.fontFamily}, Weight: ${s.fontWeight}, Size: ${s.fontSize}px, LineHeight: ${Math.round(s.lineHeightPx)}px`);
    }

    // Radius
    if (node.cornerRadius !== undefined) {
        radii.add(node.cornerRadius + 'px');
    }

    // Effects
    if (node.effects && Array.isArray(node.effects)) {
        node.effects.forEach(eff => {
            if (eff.type === 'DROP_SHADOW' && eff.color) {
                const c = toHex(eff.color);
                const a = eff.color.a.toFixed(2);
                effects.add(`DROP_SHADOW: offsetX ${eff.offset.x}, offsetY ${eff.offset.y}, blur ${eff.radius}, color ${c} (${a} alpha)`);
            }
        });
    }

    if (node.children && Array.isArray(node.children)) {
        node.children.forEach(traverse);
    }
}

if (data.nodes) {
    for (const key in data.nodes) {
        traverse(data.nodes[key].document);
    }
}

console.log("=== COLORS ===");
console.log(Array.from(colors).join('\n'));

console.log("\n=== TYPOGRAPHY ===");
console.log(Array.from(typography).join('\n'));

console.log("\n=== RADII ===");
console.log(Array.from(radii).join('\n'));

console.log("\n=== EFFECTS ===");
console.log(Array.from(effects).join('\n'));

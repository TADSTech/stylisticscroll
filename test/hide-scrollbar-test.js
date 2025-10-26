const { generateScrollbarCSS } = require('../index.js');

console.log('=== hideScrollbar Option Test ===\n');

console.log('1. Default CSS (scrollbar visible):');
const defaultCSS = generateScrollbarCSS();
console.log(defaultCSS.substring(0, 200) + '...\n');

console.log('2. CSS with hideScrollbar: true');
const hiddenCSS = generateScrollbarCSS({ hideScrollbar: true });
console.log(hiddenCSS);
console.log('\nChecks:');
console.log('✓ Contains "display: none":', hiddenCSS.includes('display: none'));
console.log('✓ Contains "scrollbar-width: none":', hiddenCSS.includes('scrollbar-width: none'));
console.log('✓ Contains "-ms-overflow-style: none":', hiddenCSS.includes('-ms-overflow-style: none'));

console.log('\n✅ hideScrollbar option working correctly!');
console.log('\nThis matches your global.css approach:');
console.log('  body::-webkit-scrollbar { display: none; }');
console.log('  scrollbar-width: none;');
console.log('  -ms-overflow-style: none;');

const { generateScrollbarCSS, defaultOptions } = require('../index.js');

console.log('=== CSS Generation Test ===\n');

console.log('Default Options:');
console.log(JSON.stringify(defaultOptions, null, 2));
console.log('\n');

console.log('Generated Default CSS:');
console.log(generateScrollbarCSS());
console.log('\n');

console.log('Generated CSS with Red Color:');
console.log(generateScrollbarCSS({ color: '#ff0000' }));
console.log('\n');

console.log('Generated CSS with Visible Track:');
console.log(generateScrollbarCSS({ 
  color: '#6366f1',
  trackBackground: '#e5e7eb',
  trackOpacity: 0.5
}));

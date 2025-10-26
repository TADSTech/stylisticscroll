# Quick Start Guide

## Installation

```bash
npm install stylisticscroll
```

## Usage

### Browser (HTML)

```html
<script src="node_modules/stylisticscroll/browser.js"></script>
<script>
  stylisticScroll({ color: '#ff0000' });
</script>
```

### Vanilla JavaScript

```javascript
const stylisticScroll = require('stylisticscroll');
stylisticScroll({ color: '#ff0000' });
```

### React

```jsx
import { useScrollbarStyles } from 'stylisticscroll/react';

function App() {
  useScrollbarStyles({ color: '#ff0000' });
  return <div>Your app</div>;
}
```

## Common Patterns

### Brand Color

```javascript
stylisticScroll({ color: '#your-brand-color' });
```

### Dark Mode

```javascript
stylisticScroll({ 
  color: '#ffffff',
  thumbOpacity: 0.2,
  thumbHoverOpacity: 0.4
});
```

### Minimal

```javascript
stylisticScroll({ 
  color: '#000000',
  width: '6px',
  thumbOpacity: 0.3
});
```

### Bold

```javascript
stylisticScroll({ 
  color: '#ff00ff',
  width: '12px',
  thumbOpacity: 0.8
});
```

### Visible Track

```javascript
stylisticScroll({
  color: '#ff0000',
  trackBackground: '#e5e7eb',
  trackOpacity: 0.3,
  thumbOpacity: 0.8
});
```

### Hide Completely

```javascript
stylisticScroll({ hideScrollbar: true });
```

## Options

```javascript
stylisticScroll({
  color: '#ff0000',           // Scrollbar color
  width: '8px',               // Width
  thumbRadius: '10px',        // Border radius
  trackBackground: 'transparent', // Track color
  thumbOpacity: 0.6,          // Opacity
  thumbHoverOpacity: 0.9,     // Hover opacity
  trackOpacity: 0             // Track opacity
});
```

## Examples

### Element-Specific

```javascript
const { applyScrollbarStylesToElement } = require('stylisticscroll');

applyScrollbarStylesToElement('#sidebar', {
  color: '#ff0000',
  width: '6px'
});
```

### Dynamic Colors

```javascript
let cleanup = null;

function changeColor(color) {
  if (cleanup) cleanup();
  cleanup = stylisticScroll({ color });
}

changeColor('#ff0000');
changeColor('#00ff00');
```

### React Element-Specific

```jsx
import { useElementScrollbarStyles } from 'stylisticscroll/react';

function Sidebar() {
  const ref = useElementScrollbarStyles({ color: '#ff0000' });
  return <div ref={ref}>Content</div>;
}
```

## Popular Colors

```javascript
// Material
stylisticScroll({ color: '#2196F3' }); // Blue
stylisticScroll({ color: '#4CAF50' }); // Green
stylisticScroll({ color: '#FF5722' }); // Orange

// Gradients
stylisticScroll({ color: '#667eea' }); // Purple-blue
stylisticScroll({ color: '#f093fb' }); // Pink
stylisticScroll({ color: '#4facfe' }); // Sky blue

// Monochrome
stylisticScroll({ color: '#333333' }); // Dark gray
stylisticScroll({ color: '#888888' }); // Medium gray
stylisticScroll({ color: '#cccccc' }); // Light gray
```

## Links

- [Full Documentation](README.md)
- [Browser Guide](BROWSER.md)
- [GitHub](https://github.com/TADSTech/stylisticscroll)

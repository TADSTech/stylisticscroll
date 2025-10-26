# StylisticScroll

Scrollbar styling library for web applications. Supports vanilla JavaScript, React, and TypeScript.

## Installation

```bash
npm install stylisticscroll
```

## Features

- Invisible scrollbar background by default
- Custom scrollbar colors (hex, rgb, rgba, named colors)
- React hooks and components
- Vanilla JavaScript support
- TypeScript definitions
- Element-specific styling
- Cross-browser compatibility (Chrome, Safari, Firefox, Edge)
- Opacity control
- Complete hide option

## Module Formats

- `index.js` - CommonJS module for Node.js and bundlers
- `browser.js` - Standalone browser build
- `react.js` - React hooks and components
- `index.d.ts`, `react.d.ts` - TypeScript definitions

## Quick Start

### Browser (No Build Tool)

```html
<script src="node_modules/stylisticscroll/browser.js"></script>
<script>
  stylisticScroll({ color: '#ff0000' });
</script>
```

### Node.js / Webpack / Bundlers

```javascript
const stylisticScroll = require('stylisticscroll');
stylisticScroll({ color: '#ff0000' });
```

### React

```javascript
import { useScrollbarStyles } from 'stylisticscroll/react';

function App() {
  useScrollbarStyles({ color: '#ff0000' });
  return <div>Your content</div>;
}
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `color` | string | `'#6366f1'` | Scrollbar color |
| `width` | string | `'8px'` | Scrollbar width |
| `thumbRadius` | string | `'10px'` | Border radius |
| `trackBackground` | string | `'transparent'` | Track background color |
| `thumbOpacity` | number | `0.6` | Scrollbar opacity (0 to 1) |
| `thumbHoverOpacity` | number | `0.9` | Opacity on hover (0 to 1) |
| `trackOpacity` | number | `0` | Track opacity (0 to 1) |
| `hideScrollbar` | boolean | `false` | Hide scrollbar completely |

## Examples

### Basic Usage

```javascript
// Default settings
stylisticScroll();

// Custom color
stylisticScroll({ color: '#ff0000' });

// Custom width
stylisticScroll({ color: '#000000', width: '12px' });

// Custom opacity
stylisticScroll({ 
  color: '#0000ff',
  thumbOpacity: 0.5,
  thumbHoverOpacity: 0.8
});

// Hide scrollbar completely
stylisticScroll({ hideScrollbar: true });
```

### Full Configuration

```javascript
stylisticScroll({
  color: '#6366f1',
  width: '10px',
  thumbRadius: '8px',
  trackBackground: '#e5e7eb',
  thumbOpacity: 0.7,
  thumbHoverOpacity: 1.0,
  trackOpacity: 0.2
});
```

### Element-Specific Styling

```javascript
const { applyScrollbarStylesToElement } = require('stylisticscroll');

// Style a specific div
applyScrollbarStylesToElement('#sidebar', {
  color: '#ff0000',
  width: '6px'
});

// Multiple elements with different styles
applyScrollbarStylesToElement('.scrollable-panel', {
  color: '#00ff00',
  width: '8px'
});

applyScrollbarStylesToElement('#main-content', {
  color: '#0000ff',
  width: '10px'
});
```

### Cleanup and Removal

```javascript
// Store cleanup function
const cleanup = stylisticScroll({ color: '#ff0000' });

// Later, remove the styles
cleanup();
```

### Dynamic Color Changes

```javascript
let currentCleanup = null;

function changeScrollbarColor(color) {
  if (currentCleanup) {
    currentCleanup();
  }
  currentCleanup = stylisticScroll({ color: color });
}

// Usage
changeScrollbarColor('#ff0000'); // Red
changeScrollbarColor('#00ff00'); // Green
changeScrollbarColor('#0000ff'); // Blue
```

### Dark Mode Implementation

```javascript
const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

stylisticScroll({
  color: isDarkMode ? '#ffffff' : '#000000',
  thumbOpacity: isDarkMode ? 0.3 : 0.6,
  thumbHoverOpacity: isDarkMode ? 0.5 : 0.9
});
```

### React Examples

#### Global Scrollbar

```javascript
import { useScrollbarStyles } from 'stylisticscroll/react';

function App() {
  useScrollbarStyles({
    color: '#ff0000',
    width: '10px'
  });

  return <div>Your app</div>;
}
```

#### Element-Specific Scrollbar

```javascript
import { useElementScrollbarStyles } from 'stylisticscroll/react';

function Sidebar() {
  const scrollRef = useElementScrollbarStyles({
    color: '#0000ff',
    width: '8px'
  });

  return (
    <div ref={scrollRef} style={{ height: '500px', overflowY: 'auto' }}>
      Sidebar content
    </div>
  );
}
```

#### Provider Pattern

```javascript
import { ScrollbarStyleProvider } from 'stylisticscroll/react';

function App() {
  return (
    <ScrollbarStyleProvider color="#ff0000" width="10px">
      <YourComponents />
    </ScrollbarStyleProvider>
  );
}
```

#### Theme-Based Scrollbars

```javascript
import { useScrollbarStyles } from 'stylisticscroll/react';
import { useState } from 'react';

function App() {
  const [color, setColor] = useState('#ff0000');

  useScrollbarStyles({ color, width: '10px' });

  return (
    <div>
      <button onClick={() => setColor('#ff0000')}>Red</button>
      <button onClick={() => setColor('#00ff00')}>Green</button>
      <button onClick={() => setColor('#0000ff')}>Blue</button>
    </div>
  );
}
```

#### Multiple Scrollable Areas

```javascript
import { useElementScrollbarStyles } from 'stylisticscroll/react';

function Dashboard() {
  const sidebarRef = useElementScrollbarStyles({ 
    color: '#ff0000', 
    width: '6px' 
  });
  
  const mainRef = useElementScrollbarStyles({ 
    color: '#0000ff', 
    width: '10px' 
  });

  return (
    <div>
      <aside ref={sidebarRef} style={{ overflowY: 'auto' }}>
        Sidebar
      </aside>
      <main ref={mainRef} style={{ overflowY: 'auto' }}>
        Main content
      </main>
    </div>
  );
}
```

### Browser Build Examples

#### HTML Page

```html
<!DOCTYPE html>
<html>
<head>
  <title>Scrollbar Demo</title>
</head>
<body>
  <div id="content" style="height: 2000px;">
    Long content
  </div>

  <script src="node_modules/stylisticscroll/browser.js"></script>
  <script>
    stylisticScroll({ color: '#ff0000', width: '12px' });
  </script>
</body>
</html>
```

#### With Button Controls

```html
<!DOCTYPE html>
<html>
<body>
  <button onclick="setRed()">Red</button>
  <button onclick="setBlue()">Blue</button>
  <button onclick="hide()">Hide</button>

  <div style="height: 2000px;">Content</div>

  <script src="node_modules/stylisticscroll/browser.js"></script>
  <script>
    var cleanup = null;

    function setRed() {
      if (cleanup) cleanup();
      cleanup = stylisticScroll({ color: '#ff0000' });
    }

    function setBlue() {
      if (cleanup) cleanup();
      cleanup = stylisticScroll({ color: '#0000ff' });
    }

    function hide() {
      if (cleanup) cleanup();
      cleanup = stylisticScroll({ hideScrollbar: true });
    }

    setRed();
  </script>
</body>
</html>
```

### TypeScript Examples

```typescript
import { ScrollbarOptions } from 'stylisticscroll';

const options: ScrollbarOptions = {
  color: '#ff0000',
  width: '10px',
  thumbOpacity: 0.6
};

stylisticScroll(options);
```

```typescript
import { useScrollbarStyles } from 'stylisticscroll/react';
import { FC } from 'react';

const App: FC = () => {
  useScrollbarStyles({ color: '#ff0000' });
  return <div>Content</div>;
};
```

### Common Color Values

```javascript
// Hex colors
stylisticScroll({ color: '#ff0000' }); // Red
stylisticScroll({ color: '#00ff00' }); // Green
stylisticScroll({ color: '#0000ff' }); // Blue
stylisticScroll({ color: '#000000' }); // Black
stylisticScroll({ color: '#ffffff' }); // White

// RGB colors
stylisticScroll({ color: 'rgb(255, 0, 0)' });

// RGBA colors (opacity in color)
stylisticScroll({ color: 'rgba(255, 0, 0, 0.5)' });

// Named colors
stylisticScroll({ color: 'red' });
stylisticScroll({ color: 'blue' });
```

### Advanced Examples

#### Conditional Styling

```javascript
const isMobile = window.innerWidth < 768;

stylisticScroll({
  color: '#ff0000',
  width: isMobile ? '6px' : '10px',
  thumbOpacity: isMobile ? 0.4 : 0.6
});
```

#### Framework Integration (Next.js)

```javascript
// pages/_app.js
import { useScrollbarStyles } from 'stylisticscroll/react';

function MyApp({ Component, pageProps }) {
  useScrollbarStyles({ color: '#ff0000' });
  return <Component {...pageProps} />;
}

export default MyApp;
```

#### Framework Integration (Vue.js)

```javascript
// main.js
import stylisticScroll from 'stylisticscroll';

stylisticScroll({ color: '#ff0000' });

new Vue({
  render: h => h(App)
}).$mount('#app');
```

## API Reference

### Vanilla JavaScript

**`stylisticScroll(options)`** or **`applyScrollbarStyles(options)`**

Applies scrollbar styles globally.

Parameters:
- `options` (Object): Configuration object

Returns:
- `Function`: Cleanup function to remove styles

**`applyScrollbarStylesToElement(element, options)`**

Applies scrollbar styles to a specific element.

Parameters:
- `element` (HTMLElement | string): DOM element or CSS selector
- `options` (Object): Configuration object

Returns:
- `Function`: Cleanup function to remove styles

**`generateScrollbarCSS(options)`**

Generates CSS string for scrollbar styling.

Parameters:
- `options` (Object): Configuration object

Returns:
- `string`: CSS string

### React

**`useScrollbarStyles(options)`**

Hook for global scrollbar styling.

Parameters:
- `options` (Object): Configuration object

**`useElementScrollbarStyles(options)`**

Hook for element-specific scrollbar styling.

Parameters:
- `options` (Object): Configuration object

Returns:
- `RefObject`: Ref to attach to element

**`<ScrollbarStyleProvider>`**

Component for global scrollbar styling.

Props:
- All configuration options as props
- `children` (ReactNode): Child components

## Browser Support

- Chrome 90+
- Edge 90+
- Safari 14+
- Firefox 88+
- Opera 76+

Internet Explorer is not supported.

## Contributing

### Reporting Issues

Submit issues at: https://github.com/TADSTech/stylisticscroll/issues

Include:
- Browser and version
- Code example that reproduces the issue
- Expected vs actual behavior

### Pull Requests

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Run tests: `npm test`
5. Commit changes: `git commit -m 'Add feature'`
6. Push to branch: `git push origin feature-name`
7. Submit pull request

### Development Setup

```bash
git clone https://github.com/TADSTech/stylisticscroll.git
cd stylisticscroll
npm install
npm test
```

### Code Guidelines

- Use clear variable names
- Add comments for complex logic
- Include examples in documentation
- Test in multiple browsers
- Follow existing code style

### Testing

Run tests:
```bash
npm test
```

Test in browser:
```bash
python3 -m http.server 8000
# Open http://localhost:8000/index.html
```

### Building

No build step required. Files are ready to use as-is.

## License

ISC License - see LICENSE file

## Links

- Repository: https://github.com/TADSTech/stylisticscroll
-Website: https://tadstech.github.io/stylisticscroll/
- Issues: https://github.com/TADSTech/stylisticscroll/issues
- npm: https://www.npmjs.com/package/stylisticscroll

## Author

TADS

# Browser Usage Guide

Using StylisticScroll without a bundler (Webpack, Rollup, Parcel).

## Installation

```bash
npm install stylisticscroll
```

## Basic Usage

```html
<!DOCTYPE html>
<html>
<head>
  <title>My Page</title>
</head>
<body>
  <h1>Content</h1>
  
  <script src="node_modules/stylisticscroll/browser.js"></script>
  <script>
    stylisticScroll({ color: '#ff0000' });
  </script>
</body>
</html>
```

## Available Functions

### stylisticScroll(options)

Apply scrollbar styles globally.

```javascript
stylisticScroll({
  color: '#ff0000',
  width: '10px',
  thumbOpacity: 0.6
});
```

Returns cleanup function:

```javascript
var cleanup = stylisticScroll({ color: '#ff0000' });
cleanup(); // Remove styles
```

### applyScrollbarStylesToElement(selector, options)

Apply scrollbar styles to specific element.

```javascript
applyScrollbarStylesToElement('#sidebar', {
  color: '#00ff00',
  width: '8px'
});
```

### generateScrollbarCSS(options)

Generate CSS string.

```javascript
var css = generateScrollbarCSS({ color: '#0000ff' });
console.log(css);
```

## Complete Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Scrollbar Demo</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 40px;
      min-height: 200vh;
    }
    .scrollable {
      height: 300px;
      overflow-y: auto;
      border: 1px solid #ddd;
      padding: 20px;
    }
    button {
      padding: 10px 20px;
      margin: 5px;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <h1>Scrollbar Demo</h1>
  
  <div>
    <button onclick="changeColor('#ff0000')">Red</button>
    <button onclick="changeColor('#00ff00')">Green</button>
    <button onclick="changeColor('#0000ff')">Blue</button>
    <button onclick="hideScrollbar()">Hide</button>
  </div>

  <div class="scrollable">
    <h3>Scrollable Box</h3>
    <p>Lorem ipsum dolor sit amet</p>
    <p>Consectetur adipiscing elit</p>
    <p>Sed do eiusmod tempor</p>
    <p>Incididunt ut labore</p>
    <p>Et dolore magna aliqua</p>
  </div>

  <script src="node_modules/stylisticscroll/browser.js"></script>
  
  <script>
    var currentCleanup = null;

    // Initialize
    currentCleanup = stylisticScroll({ color: '#ff0000' });

    function changeColor(color) {
      if (currentCleanup) {
        currentCleanup();
      }
      currentCleanup = stylisticScroll({
        color: color,
        width: '10px',
        thumbOpacity: 0.6,
        thumbHoverOpacity: 0.9
      });
    }

    function hideScrollbar() {
      if (currentCleanup) {
        currentCleanup();
      }
      currentCleanup = stylisticScroll({ hideScrollbar: true });
    }

    // Style scrollable box independently
    applyScrollbarStylesToElement('.scrollable', {
      color: '#ff00ff',
      width: '8px'
    });
  </script>
</body>
</html>
```

## CDN Usage

```html
<script src="https://unpkg.com/stylisticscroll/browser.js"></script>
<script>
  stylisticScroll({ color: '#ff0000' });
</script>
```

## Tips

1. Load `browser.js` before custom scripts
2. Use `var` for global scope compatibility
3. Call `applyScrollbarStylesToElement()` for multiple elements
4. Store cleanup functions to remove styles later

## Browser Support

- Chrome/Edge (Chromium): Full support
- Safari: Full support
- Firefox: Limited styling support
- Internet Explorer: Not supported

## Troubleshooting

### stylisticScroll is not defined

- Check `browser.js` loads before your script
- Verify file path is correct
- Check browser console for loading errors

### Scrollbar not showing

- Ensure content is scrollable
- Check DevTools for applied styles
- Increase `thumbOpacity` value

### Styles not applying

- Check console for JavaScript errors
- Verify element selector is correct
- Ensure element exists when script runs

## Examples

### Dynamic Color Switching

```html
<select onchange="changeColor(this.value)">
  <option value="#ff0000">Red</option>
  <option value="#00ff00">Green</option>
  <option value="#0000ff">Blue</option>
</select>

<script>
  var cleanup = stylisticScroll({ color: '#ff0000' });
  
  function changeColor(color) {
    cleanup();
    cleanup = stylisticScroll({ color: color });
  }
</script>
```

### Multiple Scrollable Areas

```html
<div id="sidebar"></div>
<div id="main"></div>

<script>
  applyScrollbarStylesToElement('#sidebar', {
    color: '#ff0000',
    width: '6px'
  });
  
  applyScrollbarStylesToElement('#main', {
    color: '#0000ff',
    width: '10px'
  });
</script>
```

### Dark Mode

```html
<script>
  var isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  stylisticScroll({
    color: isDark ? '#ffffff' : '#000000',
    thumbOpacity: isDark ? 0.3 : 0.6
  });
</script>
```

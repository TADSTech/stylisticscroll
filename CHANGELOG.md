# Changelog

All notable changes to this project.

Format based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
Versioning follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-10-25

### Added

**Core Features**
- Scrollbar styling library for web applications
- Invisible scrollbar background by default
- Custom scrollbar colors (hex, rgb, rgba, named)

**Module Formats**
- `index.js` - CommonJS module for bundlers
- `browser.js` - Standalone browser build
- `react.js` - React hooks and components

**Vanilla JavaScript API**
- `applyScrollbarStyles()` - Global scrollbar styling
- `applyScrollbarStylesToElement()` - Element-specific styling
- `generateScrollbarCSS()` - CSS generation utility
- Cleanup functions for style removal

**React API**
- `useScrollbarStyles` - Hook for global styling
- `useElementScrollbarStyles` - Hook for element-specific styling
- `ScrollbarStyleProvider` - Component for global styling

**Configuration Options**
- `color` - Scrollbar color
- `width` - Scrollbar width
- `thumbRadius` - Border radius
- `trackBackground` - Track background color
- `thumbOpacity` - Scrollbar opacity
- `thumbHoverOpacity` - Hover opacity
- `trackOpacity` - Track opacity (default 0)
- `hideScrollbar` - Complete hide option

**Technical Features**
- TypeScript type definitions
- Automatic hex to RGBA conversion for opacity
- Cross-browser support (Chrome, Safari, Edge, Firefox)
- Zero dependencies (React optional)
- Multiple scrollbar instances support

**Documentation**
- README.md with examples
- BROWSER.md for browser usage
- QUICKSTART.md for quick reference
- CHANGELOG.md

**Examples**
- Vanilla JavaScript demo
- React examples
- Browser usage patterns

### Technical Details

**Opacity Handling**
- Converts hex colors to RGBA when opacity < 1
- Supports rgb(), rgba(), hex, and named colors
- Proper transparency across browsers

**Scrollbar Hide Implementation**
- Uses `scrollbar-width: none` (Firefox)
- Uses `-ms-overflow-style: none` (IE/Edge legacy)
- Uses `::-webkit-scrollbar { display: none }` (Chrome/Safari)
- Maintains scroll functionality

**Browser Compatibility**
- Chrome 90+
- Edge 90+
- Safari 14+
- Firefox 88+ (limited styling)
- Opera 76+

## [Unreleased]

### Planned
- Animation options
- Preset themes
- Improved Firefox styling
- Dark mode auto-detection
- Custom hover transitions

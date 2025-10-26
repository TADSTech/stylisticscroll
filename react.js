/**
 * StylisticScroll - React Integration
 * React hooks and components for customizable scrollbar styles
 */

const { generateScrollbarCSS, defaultOptions } = require('./index');

// Check if React is available
let React;
try {
  React = require('react');
} catch (e) {
  // React not available
}

/**
 * React Hook to apply scrollbar styles
 * @param {Object} options - Styling options
 * @returns {void}
 */
function useScrollbarStyles(options = {}) {
  if (!React) {
    console.warn('StylisticScroll: React is not available');
    return;
  }

  const { useEffect } = React;

  useEffect(() => {
    const styleId = 'stylistic-scroll-styles';
    
    // Remove existing style element if present
    const existingStyle = document.getElementById(styleId);
    if (existingStyle) {
      existingStyle.remove();
    }

    // Create and inject style element
    const styleElement = document.createElement('style');
    styleElement.id = styleId;
    styleElement.textContent = generateScrollbarCSS(options);
    document.head.appendChild(styleElement);

    // Cleanup on unmount
    return () => {
      const style = document.getElementById(styleId);
      if (style) {
        style.remove();
      }
    };
  }, [options.color, options.width, options.thumbRadius, options.trackBackground, options.thumbOpacity, options.thumbHoverOpacity, options.trackOpacity, options.hideScrollbar]);
}

/**
 * React Hook to apply scrollbar styles to a specific element
 * @param {Object} options - Styling options
 * @returns {React.RefObject} Ref to attach to the element
 */
function useElementScrollbarStyles(options = {}) {
  if (!React) {
    console.warn('StylisticScroll: React is not available');
    return null;
  }

  const { useRef, useEffect } = React;
  const elementRef = useRef(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const opts = { ...defaultOptions, ...options };
    const styleId = `stylistic-scroll-${Math.random().toString(36).substr(2, 9)}`;
    const uniqueClass = `stylistic-scroll-${styleId}`;
    
    elementRef.current.classList.add(uniqueClass);

    let css;

    // If hideScrollbar is true, completely hide scrollbar
    if (opts.hideScrollbar) {
      css = `
        .${uniqueClass} {
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE and Edge */
        }

        .${uniqueClass}::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera */
        }
      `;
    } else {
      // Helper function to convert hex to rgba (inline version)
      const convertToRGBA = (color, opacity) => {
        if (color === 'transparent' || color.startsWith('rgba') || color.startsWith('rgb(')) {
          if (color.startsWith('rgb(') && opacity < 1) {
            return color.replace('rgb(', 'rgba(').replace(')', `, ${opacity})`);
          }
          return color;
        }
        if (color.startsWith('#')) {
          const hex = color.replace('#', '');
          let r, g, b;
          if (hex.length === 3) {
            r = parseInt(hex[0] + hex[0], 16);
            g = parseInt(hex[1] + hex[1], 16);
            b = parseInt(hex[2] + hex[2], 16);
          } else if (hex.length === 6) {
            r = parseInt(hex.substr(0, 2), 16);
            g = parseInt(hex.substr(2, 2), 16);
            b = parseInt(hex.substr(4, 2), 16);
          } else {
            return color;
          }
          return `rgba(${r}, ${g}, ${b}, ${opacity})`;
        }
        return color;
      };

      const thumbColor = opts.thumbOpacity < 1 
        ? convertToRGBA(opts.color, opts.thumbOpacity)
        : opts.color;
      
      const thumbHoverColor = opts.thumbHoverOpacity < 1 && opts.thumbHoverOpacity !== opts.thumbOpacity
        ? convertToRGBA(opts.color, opts.thumbHoverOpacity)
        : opts.color;
      
      const trackColor = opts.trackOpacity > 0
        ? (opts.trackBackground === 'transparent' ? 'transparent' : convertToRGBA(opts.trackBackground, opts.trackOpacity))
        : 'transparent';

      css = `
        .${uniqueClass}::-webkit-scrollbar {
          width: ${opts.width};
          height: ${opts.width};
        }

        .${uniqueClass}::-webkit-scrollbar-track {
          background: ${trackColor};
        }

        .${uniqueClass}::-webkit-scrollbar-thumb {
          background: ${thumbColor};
          border-radius: ${opts.thumbRadius};
        }

        .${uniqueClass}::-webkit-scrollbar-thumb:hover {
          background: ${thumbHoverColor};
        }

        .${uniqueClass} {
          scrollbar-width: thin;
          scrollbar-color: ${thumbColor} ${trackColor};
        }
      `;
    }

    const styleElement = document.createElement('style');
    styleElement.id = styleId;
    styleElement.textContent = css;
    document.head.appendChild(styleElement);

    return () => {
      if (elementRef.current) {
        elementRef.current.classList.remove(uniqueClass);
      }
      const style = document.getElementById(styleId);
      if (style) {
        style.remove();
      }
    };
  }, [options.color, options.width, options.thumbRadius, options.trackBackground, options.thumbOpacity, options.thumbHoverOpacity, options.trackOpacity, options.hideScrollbar]);

  return elementRef;
}

/**
 * ScrollbarStyleProvider Component
 * Wraps your app to provide global scrollbar styles
 */
function ScrollbarStyleProvider({ children, color, width, thumbRadius, trackBackground, thumbOpacity, thumbHoverOpacity, trackOpacity }) {
  if (!React) {
    console.warn('StylisticScroll: React is not available');
    return children;
  }

  useScrollbarStyles({
    color,
    width,
    thumbRadius,
    trackBackground,
    thumbOpacity,
    thumbHoverOpacity,
    trackOpacity
  });

  return children;
}

module.exports = {
  useScrollbarStyles,
  useElementScrollbarStyles,
  ScrollbarStyleProvider
};

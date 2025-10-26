/**
 * StylisticScroll - Browser Build
 * Customizable transparent scrollbar styles for browsers
 */

(function(window) {
  'use strict';

  const defaultOptions = {
    color: '#6366f1', // Default indigo color (knob/thumb)
    width: '8px',
    thumbRadius: '10px',
    trackBackground: 'transparent', // Gutter/track background
    thumbOpacity: 0.6, // Knob opacity
    thumbHoverOpacity: 0.9, // Knob hover opacity
    trackOpacity: 0, // Completely invisible by default
    hideScrollbar: false, // Set to true to completely hide scrollbar (like display: none)
    selector: '::-webkit-scrollbar' // Can be customized for specific elements
  };

  /**
   * Convert hex color to rgba with opacity
   * @param {string} color - Hex color code or color name
   * @param {number} opacity - Opacity value (0-1)
   * @returns {string} RGBA color string
   */
  function convertToRGBA(color, opacity) {
    // If already transparent or rgba, return as is
    if (color === 'transparent' || color.startsWith('rgba')) {
      return color;
    }
    
    // If rgb, convert to rgba
    if (color.startsWith('rgb(')) {
      return color.replace('rgb(', 'rgba(').replace(')', `, ${opacity})`);
    }
    
    // Handle hex colors
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
        return color; // Invalid hex, return as is
      }
      
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    
    // For named colors, return as is (browser will handle)
    return color;
  }

  /**
   * Generate CSS for scrollbar styling
   * @param {Object} options - Styling options
   * @returns {string} CSS string
   */
  function generateScrollbarCSS(options = {}) {
    const opts = { ...defaultOptions, ...options };
    
    // If hideScrollbar is true, return CSS to completely hide scrollbar
    if (opts.hideScrollbar) {
      return `
        /* Completely hide scrollbar - all browsers */
        * {
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE and Edge */
        }

        *::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera */
        }
      `;
    }
    
    // Convert hex color with opacity to rgba if needed
    const thumbColor = opts.thumbOpacity < 1 
      ? convertToRGBA(opts.color, opts.thumbOpacity)
      : opts.color;
    
    const thumbHoverColor = opts.thumbHoverOpacity < 1 && opts.thumbHoverOpacity !== opts.thumbOpacity
      ? convertToRGBA(opts.color, opts.thumbHoverOpacity)
      : opts.color;
    
    const trackColor = opts.trackOpacity > 0
      ? (opts.trackBackground === 'transparent' ? 'transparent' : convertToRGBA(opts.trackBackground, opts.trackOpacity))
      : 'transparent';
    
    return `
      /* Webkit browsers (Chrome, Safari, Edge) - Gutter and Knob */
      *::-webkit-scrollbar {
        width: ${opts.width};
        height: ${opts.width};
      }

      *::-webkit-scrollbar-track {
        background: ${trackColor}; /* Gutter - transparent by default */
      }

      *::-webkit-scrollbar-thumb {
        background: ${thumbColor}; /* Knob/thumb with opacity */
        border-radius: ${opts.thumbRadius};
      }

      *::-webkit-scrollbar-thumb:hover {
        background: ${thumbHoverColor}; /* Knob/thumb hover state */
      }

      /* Firefox - thin scrollbar */
      * {
        scrollbar-width: thin;
        scrollbar-color: ${thumbColor} ${trackColor};
      }
    `;
  }

  /**
   * Apply scrollbar styles (Vanilla JS)
   * @param {Object} options - Styling options
   * @returns {Function} Cleanup function to remove styles
   */
  function applyScrollbarStyles(options = {}) {
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

    // Return cleanup function
    return () => {
      const style = document.getElementById(styleId);
      if (style) {
        style.remove();
      }
    };
  }

  /**
   * Apply scrollbar styles to specific element (Vanilla JS)
   * @param {HTMLElement|string} element - DOM element or selector
   * @param {Object} options - Styling options
   * @returns {Function} Cleanup function to remove styles
   */
  function applyScrollbarStylesToElement(element, options = {}) {
    const opts = { ...defaultOptions, ...options };
    const targetElement = typeof element === 'string' ? document.querySelector(element) : element;
    
    if (!targetElement) {
      console.warn('StylisticScroll: Element not found');
      return () => {};
    }

    const styleId = `stylistic-scroll-${Math.random().toString(36).substr(2, 9)}`;
    const uniqueClass = `stylistic-scroll-${styleId}`;
    
    targetElement.classList.add(uniqueClass);

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
          background: ${trackColor}; /* Gutter - transparent by default */
        }

        .${uniqueClass}::-webkit-scrollbar-thumb {
          background: ${thumbColor}; /* Knob/thumb with opacity */
          border-radius: ${opts.thumbRadius};
        }

        .${uniqueClass}::-webkit-scrollbar-thumb:hover {
          background: ${thumbHoverColor}; /* Knob/thumb hover state */
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
      targetElement.classList.remove(uniqueClass);
      const style = document.getElementById(styleId);
      if (style) {
        style.remove();
      }
    };
  }

  // Expose to window
  window.stylisticScroll = applyScrollbarStyles;
  window.applyScrollbarStylesToElement = applyScrollbarStylesToElement;
  window.generateScrollbarCSS = generateScrollbarCSS;

})(window);

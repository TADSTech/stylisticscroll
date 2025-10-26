// Type definitions for stylisticscroll
// Project: https://github.com/TADSTech/stylisticscroll
// Definitions by: TADS

export interface ScrollbarOptions {
  /**
   * Color of the scrollbar knob (thumb)
   * @default '#6366f1'
   */
  color?: string;

  /**
   * Width of the scrollbar
   * @default '8px'
   */
  width?: string;

  /**
   * Border radius of the scrollbar knob (thumb)
   * @default '10px'
   */
  thumbRadius?: string;

  /**
   * Background color of the scrollbar gutter (track)
   * @default 'transparent'
   */
  trackBackground?: string;

  /**
   * Opacity of the scrollbar knob (thumb)
   * Applied to the color - converts hex to rgba
   * @default 0.6
   */
  thumbOpacity?: number;

  /**
   * Opacity of the scrollbar knob (thumb) on hover
   * Applied to the color - converts hex to rgba
   * @default 0.9
   */
  thumbHoverOpacity?: number;

  /**
   * Opacity of the scrollbar gutter (track)
   * 0 makes it completely invisible (default)
   * @default 0
   */
  trackOpacity?: number;

  /**
   * Completely hide the scrollbar (like display: none)
   * When true, scrollbar is completely hidden but scrolling still works
   * @default false
   */
  hideScrollbar?: boolean;
}

/**
 * Apply scrollbar styles globally to the entire page
 * @param options - Configuration options
 * @returns Cleanup function to remove styles
 */
export function applyScrollbarStyles(options?: ScrollbarOptions): () => void;

/**
 * Apply scrollbar styles to a specific element
 * @param element - DOM element or selector
 * @param options - Configuration options
 * @returns Cleanup function to remove styles
 */
export function applyScrollbarStylesToElement(
  element: HTMLElement | string,
  options?: ScrollbarOptions
): () => void;

/**
 * Generate CSS string for scrollbar styling
 * @param options - Configuration options
 * @returns CSS string
 */
export function generateScrollbarCSS(options?: ScrollbarOptions): string;

/**
 * Default options for scrollbar styling
 */
export const defaultOptions: ScrollbarOptions;

export default applyScrollbarStyles;

// Type definitions for stylisticscroll/react
// Project: https://github.com/TADSTech/stylisticscroll
// Definitions by: TADS

import * as React from 'react';

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
 * React hook to apply global scrollbar styles
 * @param options - Configuration options
 */
export function useScrollbarStyles(options?: ScrollbarOptions): void;

/**
 * React hook to apply scrollbar styles to a specific element
 * @param options - Configuration options
 * @returns Ref to attach to the element
 */
export function useElementScrollbarStyles(
  options?: ScrollbarOptions
): React.RefObject<HTMLElement>;

export interface ScrollbarStyleProviderProps extends ScrollbarOptions {
  children: React.ReactNode;
}

/**
 * React component to provide global scrollbar styles
 */
export const ScrollbarStyleProvider: React.FC<ScrollbarStyleProviderProps>;

import React, { useState } from 'react';
import { useScrollbarStyles, useElementScrollbarStyles, ScrollbarStyleProvider } from '../react';

// Example 1: Global scrollbar styling with hook
function Example1() {
  const [color, setColor] = useState('#6366f1');

  useScrollbarStyles({
    color: color,
    width: '10px',
    thumbOpacity: 0.6,
    thumbHoverOpacity: 0.9
  });

  const colors = [
    { name: 'Indigo', value: '#6366f1' },
    { name: 'Pink', value: '#ec4899' },
    { name: 'Green', value: '#10b981' },
    { name: 'Orange', value: '#f59e0b' },
    { name: 'Purple', value: '#8b5cf6' },
  ];

  return (
    <div style={{ padding: '40px', minHeight: '100vh', background: '#f3f4f6' }}>
      <h1>Example 1: Global Scrollbar Styling</h1>
      <p>Change the scrollbar color for the entire page:</p>
      <div style={{ display: 'flex', gap: '10px', margin: '20px 0' }}>
        {colors.map(({ name, value }) => (
          <button
            key={value}
            onClick={() => setColor(value)}
            style={{
              padding: '10px 20px',
              background: value,
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            {name}
          </button>
        ))}
      </div>
      <div style={{ height: '200vh', padding: '20px', background: 'white', borderRadius: '10px' }}>
        <h2>Scroll this page to see the custom scrollbar</h2>
        <p>The scrollbar color changes when you click the buttons above.</p>
      </div>
    </div>
  );
}

// Example 2: Element-specific scrollbar styling
function Example2() {
  const scrollRef1 = useElementScrollbarStyles({
    color: '#ef4444',
    width: '8px',
    thumbRadius: '4px'
  });

  const scrollRef2 = useElementScrollbarStyles({
    color: '#10b981',
    width: '12px',
    thumbRadius: '6px'
  });

  return (
    <div style={{ padding: '40px', background: '#1f2937', minHeight: '100vh', color: 'white' }}>
      <h1>Example 2: Element-Specific Scrollbars</h1>
      <p>Each box has its own unique scrollbar style:</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
        <div>
          <h3>Red Scrollbar</h3>
          <div
            ref={scrollRef1}
            style={{
              height: '300px',
              overflowY: 'auto',
              background: '#374151',
              padding: '20px',
              borderRadius: '10px'
            }}
          >
            <p>This box has a red scrollbar.</p>
            {Array.from({ length: 20 }, (_, i) => (
              <p key={i}>Line {i + 1} - Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            ))}
          </div>
        </div>

        <div>
          <h3>Green Scrollbar</h3>
          <div
            ref={scrollRef2}
            style={{
              height: '300px',
              overflowY: 'auto',
              background: '#374151',
              padding: '20px',
              borderRadius: '10px'
            }}
          >
            <p>This box has a green scrollbar.</p>
            {Array.from({ length: 20 }, (_, i) => (
              <p key={i}>Line {i + 1} - Sed do eiusmod tempor incididunt ut labore et dolore.</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Example 3: Using ScrollbarStyleProvider
function Example3Content() {
  return (
    <div style={{ padding: '40px', minHeight: '100vh' }}>
      <h1>Example 3: ScrollbarStyleProvider</h1>
      <p>This entire component is wrapped in a ScrollbarStyleProvider.</p>
      <div style={{ height: '200vh', background: 'white', padding: '20px', borderRadius: '10px' }}>
        <h2>Scroll to see the purple scrollbar</h2>
        <p>The provider applies styles to all content within it.</p>
      </div>
    </div>
  );
}

function Example3() {
  return (
    <ScrollbarStyleProvider
      color="#8b5cf6"
      width="10px"
      thumbOpacity={0.5}
      thumbHoverOpacity={0.8}
    >
      <Example3Content />
    </ScrollbarStyleProvider>
  );
}

// Example 4: Dynamic theme switching
function Example4() {
  const [theme, setTheme] = useState('light');

  const themes = {
    light: {
      background: '#ffffff',
      text: '#000000',
      scrollbar: '#3b82f6'
    },
    dark: {
      background: '#1a1a2e',
      text: '#ffffff',
      scrollbar: '#ec4899'
    },
    ocean: {
      background: '#0f172a',
      text: '#ffffff',
      scrollbar: '#06b6d4'
    }
  };

  useScrollbarStyles({
    color: themes[theme].scrollbar,
    width: '12px',
    thumbOpacity: 0.7,
    thumbHoverOpacity: 1.0
  });

  return (
    <div
      style={{
        padding: '40px',
        minHeight: '100vh',
        background: themes[theme].background,
        color: themes[theme].text,
        transition: 'all 0.3s ease'
      }}
    >
      <h1>Example 4: Theme-Based Scrollbars</h1>
      <p>Switch themes to see the scrollbar color change:</p>
      <div style={{ margin: '20px 0' }}>
        {Object.keys(themes).map(themeName => (
          <button
            key={themeName}
            onClick={() => setTheme(themeName)}
            style={{
              padding: '10px 20px',
              margin: '0 10px',
              background: themes[themeName].scrollbar,
              color: 'white',
              border: theme === themeName ? '3px solid yellow' : 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold',
              textTransform: 'capitalize'
            }}
          >
            {themeName}
          </button>
        ))}
      </div>
      <div style={{ height: '150vh', marginTop: '20px' }}>
        <h2>Scroll to see the themed scrollbar</h2>
        <p>Each theme has its own scrollbar color that matches the overall design.</p>
      </div>
    </div>
  );
}

// Main App component to showcase all examples
function App() {
  const [currentExample, setCurrentExample] = useState(1);

  const examples = [
    { id: 1, name: 'Global Styling', component: Example1 },
    { id: 2, name: 'Element-Specific', component: Example2 },
    { id: 3, name: 'Provider Pattern', component: Example3 },
    { id: 4, name: 'Theme Switching', component: Example4 }
  ];

  const CurrentComponent = examples.find(e => e.id === currentExample)?.component || Example1;

  return (
    <div>
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        background: '#111827',
        padding: '15px',
        display: 'flex',
        gap: '10px',
        zIndex: 1000,
        boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
      }}>
        {examples.map(({ id, name }) => (
          <button
            key={id}
            onClick={() => setCurrentExample(id)}
            style={{
              padding: '10px 20px',
              background: currentExample === id ? '#6366f1' : '#374151',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: currentExample === id ? 'bold' : 'normal'
            }}
          >
            {name}
          </button>
        ))}
      </nav>
      <div style={{ paddingTop: '60px' }}>
        <CurrentComponent />
      </div>
    </div>
  );
}

export default App;

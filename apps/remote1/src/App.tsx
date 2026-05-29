import React from 'react';
import Dashboard from './Dashboard';

function App() {
  return (
    <div style={{ minHeight: '100vh', background: '#0b0f19', padding: '24px' }}>
      <header style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)', paddingBottom: '16px', marginBottom: '24px' }}>
        <h1 style={{ margin: 0, fontSize: '20px', color: '#ffffff', fontFamily: 'sans-serif' }}>
          Remote MFE 1: Standalone Sandbox
        </h1>
        <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#9ca3af' }}>
          Running in isolated development environment (Port 5001)
        </p>
      </header>
      <Dashboard />
    </div>
  );
}

export default App;

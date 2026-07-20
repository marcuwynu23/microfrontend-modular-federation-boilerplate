import React, { useState, lazy, Suspense } from 'react';
import { Card, Button } from '@mfe/shared-ui';

// Lazy loading federated components
const Remote1Dashboard = lazy(() => import('remote1/Dashboard'));
const Remote2Profile = lazy(() => import('remote2/Profile'));

// Enterprise Error Boundary to handle remote loading failures gracefully
class MfeErrorBoundary extends React.Component<
  { fallback: React.ReactNode; children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error('Failed to load Micro Frontend:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Sleek loading skeleton for remote components
const LoadingSkeleton = () => (
  <div style={{
    padding: '24px',
    background: 'rgba(255, 255, 255, 0.02)',
    borderRadius: '16px',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    animation: 'pulse 1.5s infinite ease-in-out'
  }}>
    <div style={{ width: '40%', height: '24px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '4px' }}></div>
    <div style={{ width: '100%', height: '120px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px' }}></div>
    <div style={{ display: 'flex', gap: '12px' }}>
      <div style={{ width: '120px', height: '40px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '6px' }}></div>
      <div style={{ width: '120px', height: '40px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '6px' }}></div>
    </div>
  </div>
);

// Offline indicator fallback
const MfeOfflineFallback = ({ moduleName }: { moduleName: string }) => (
  <Card style={{ borderColor: 'rgba(239, 68, 68, 0.2)', background: 'rgba(239, 68, 68, 0.02)' }}>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '24px 0' }}>
      <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
      <h3 style={{ margin: '0 0 8px 0', color: '#ef4444', fontSize: '18px', fontWeight: '600' }}>
        Micro Frontend Offline
      </h3>
      <p style={{ margin: '0 0 20px 0', color: '#9ca3af', fontSize: '14px', maxWidth: '400px' }}>
        The module <strong>{moduleName}</strong> failed to load. The container might be offline or building.
      </p>
      <Button variant="secondary" onClick={() => window.location.reload()}>
        Retry Connection
      </Button>
    </div>
  </Card>
);

function App() {
  const [activeTab, setActiveTab] = useState<'overview' | 'dashboard' | 'profile'>('overview');
  const [user, setUser] = useState({ name: 'Sarah Jenkins', role: 'Senior Security Analyst' });

  const handleUserUpdate = (name: string, role: string) => {
    setUser({ name, role });
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#070a13',
      backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(99, 102, 241, 0.05) 0%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(16, 185, 129, 0.04) 0%, transparent 40%)',
      color: '#f3f4f6',
      fontFamily: "'Outfit', 'Inter', system-ui, sans-serif",
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Premium Top Navigation */}
      <header style={{
        padding: '16px 40px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(20px)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'rgba(7, 10, 19, 0.8)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #6366f1 0%, #10b981 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '800',
            fontSize: '18px',
            color: '#ffffff',
            boxShadow: '0 0 15px rgba(99, 102, 241, 0.5)'
          }}>
            N
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: '18px', fontWeight: '700', letterSpacing: '-0.3px', color: '#ffffff' }}>
              NEXUS CORE
            </h1>
            <span style={{ fontSize: '10px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Federated Enterprise Shell
            </span>
          </div>
        </div>

        {/* Global Shell State Info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <span style={{ fontSize: '12px', fontWeight: '500', color: '#ffffff' }}>{user.name}</span>
            <span style={{ fontSize: '10px', color: '#6366f1', fontWeight: '600' }}>{user.role}</span>
          </div>
          <div style={{
            padding: '4px 10px',
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.2)',
            borderRadius: '20px',
            fontSize: '11px',
            color: '#10b981',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 6px #10b981' }}></span>
            PROD RUNTIME
          </div>
        </div>
      </header>

      {/* Main Core Layout */}
      <div style={{ display: 'flex', flex: 1, padding: '40px' }}>
        {/* Navigation Sidebar */}
        <aside style={{ width: '260px', marginRight: '40px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button
            onClick={() => setActiveTab('overview')}
            style={{
              padding: '14px 20px',
              borderRadius: '12px',
              border: 'none',
              background: activeTab === 'overview' ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
              color: activeTab === 'overview' ? '#ffffff' : '#9ca3af',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              textAlign: 'left',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              transition: 'all 0.2s ease',
              borderLeft: activeTab === 'overview' ? '3px solid #6366f1' : '3px solid transparent'
            }}
          >
            <span>💻</span> Global Overview
          </button>
          <button
            onClick={() => setActiveTab('dashboard')}
            style={{
              padding: '14px 20px',
              borderRadius: '12px',
              border: 'none',
              background: activeTab === 'dashboard' ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
              color: activeTab === 'dashboard' ? '#ffffff' : '#9ca3af',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              textAlign: 'left',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              transition: 'all 0.2s ease',
              borderLeft: activeTab === 'dashboard' ? '3px solid #6366f1' : '3px solid transparent'
            }}
          >
            <span>📊</span> MFE 1: Dashboard
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            style={{
              padding: '14px 20px',
              borderRadius: '12px',
              border: 'none',
              background: activeTab === 'profile' ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
              color: activeTab === 'profile' ? '#ffffff' : '#9ca3af',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              textAlign: 'left',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              transition: 'all 0.2s ease',
              borderLeft: activeTab === 'profile' ? '3px solid #6366f1' : '3px solid transparent'
            }}
          >
            <span>🛡️</span> MFE 2: Security Profile
          </button>
        </aside>

        {/* Content Workspace */}
        <main style={{ flex: 1, minWidth: 0 }}>
          {activeTab === 'overview' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <div>
                <h2 style={{ margin: '0 0 8px 0', fontSize: '28px', fontWeight: '700', letterSpacing: '-0.5px' }}>
                  Enterprise Overview
                </h2>
                <p style={{ margin: 0, fontSize: '14px', color: '#9ca3af' }}>
                  A demonstration of federated module orchestration using Turborepo workspaces and Vite module federation plugins.
                </p>
              </div>

              {/* Status Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
                <Card title="Microfrontend Registry" subtitle="Current cluster module health status">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '16px' }}>🖥️</span>
                        <span style={{ fontSize: '14px', fontWeight: '600' }}>Host Shell</span>
                      </div>
                      <span style={{ fontSize: '12px', color: '#10b981', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ width: '6px', height: '6px', background: '#10b981', borderRadius: '50%' }}></span>
                        Active
                      </span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '16px' }}>📊</span>
                        <span style={{ fontSize: '14px', fontWeight: '600' }}>remote1 (Dashboard)</span>
                      </div>
                      <span style={{ fontSize: '12px', color: '#10b981', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ width: '6px', height: '6px', background: '#10b981', borderRadius: '50%' }}></span>
                        Exposing ./Dashboard
                      </span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '16px' }}>🛡️</span>
                        <span style={{ fontSize: '14px', fontWeight: '600' }}>remote2 (Profile)</span>
                      </div>
                      <span style={{ fontSize: '12px', color: '#10b981', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ width: '6px', height: '6px', background: '#10b981', borderRadius: '50%' }}></span>
                        Exposing ./Profile
                      </span>
                    </div>
                  </div>
                </Card>

                <Card title="Shared Library" subtitle="Component source packages/@mfe/shared-ui">
                  <p style={{ margin: '0 0 16px 0', fontSize: '14px', color: '#9ca3af', lineHeight: '1.6' }}>
                    This section demonstrates reusable components imported directly from a shared TypeScript package inside the Turborepo monorepo structure.
                  </p>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <Button variant="accent">Shared Accent Button</Button>
                    <Button variant="secondary">Shared Secondary Button</Button>
                  </div>
                </Card>
              </div>

              {/* Architecture Explanation */}
              <Card title="Modular Federation Pipeline" subtitle="Production Architecture">
                <p style={{ margin: '0 0 16px 0', fontSize: '14px', lineHeight: '1.6', color: '#d1d5db' }}>
                  In production, all built assets are containerized and served using individual Nginx servers. A centralized <strong>Nginx Gateway reverse-proxy</strong> intercepts all client traffic and routes assets dynamically based on context subpaths:
                </p>
                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.03)', fontFamily: 'monospace', fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div>🌐 <span style={{ color: '#818cf8' }}>{import.meta.env.VITE_HOST_URL || 'http://localhost'}/</span> - Serves the main Host Shell compiled assets</div>
                  <div>📊 <span style={{ color: '#10b981' }}>{import.meta.env.VITE_REMOTE1_PROXY_PATH || '/remote1/'}</span> - Proxies to the Dashboard MFE static assets</div>
                  <div>🛡️ <span style={{ color: '#f59e0b' }}>{import.meta.env.VITE_REMOTE2_PROXY_PATH || '/remote2/'}</span> - Proxies to the Security Profile MFE static assets</div>
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'dashboard' && (
            <MfeErrorBoundary fallback={<MfeOfflineFallback moduleName="remote1 (Dashboard)" />}>
              <Suspense fallback={<LoadingSkeleton />}>
                <Remote1Dashboard user={user} />
              </Suspense>
            </MfeErrorBoundary>
          )}

          {activeTab === 'profile' && (
            <MfeErrorBoundary fallback={<MfeOfflineFallback moduleName="remote2 (Profile)" />}>
              <Suspense fallback={<LoadingSkeleton />}>
                <Remote2Profile
                  initialName={user.name}
                  initialRole={user.role}
                  onUpdate={handleUserUpdate}
                />
              </Suspense>
            </MfeErrorBoundary>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer style={{
        padding: '24px 40px',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        textAlign: 'center',
        fontSize: '12px',
        color: '#9ca3af',
        background: 'rgba(7, 10, 19, 0.4)'
      }}>
        Nexus Modular Shell • Built with Turborepo, Vite, Docker, and Nginx.
      </footer>
    </div>
  );
}

export default App;

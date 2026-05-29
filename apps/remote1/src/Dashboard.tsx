import React, { useState } from 'react';
import { Card, Button } from '@mfe/shared-ui';

export interface DashboardProps {
  user?: { name: string; role: string };
}

export const Dashboard: React.FC<DashboardProps> = ({ user = { name: 'Administrator', role: 'Global Lead' } }) => {
  const [sales, setSales] = useState(142380);
  const [activeUsers, setActiveUsers] = useState(842);

  const simulateActivity = () => {
    setSales(prev => prev + Math.floor(Math.random() * 500) + 100);
    setActiveUsers(prev => prev + Math.floor(Math.random() * 10) - 4);
  };

  return (
    <div style={{ padding: '20px', fontFamily: "'Outfit', 'Inter', sans-serif", color: '#ffffff' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <span style={{ fontSize: '12px', fontWeight: '600', color: '#6366f1', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Micro Frontend Module: remote1
          </span>
          <h2 style={{ margin: '4px 0 0 0', fontSize: '28px', fontWeight: '700', letterSpacing: '-0.5px' }}>
            Enterprise Dashboard
          </h2>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255, 255, 255, 0.04)', padding: '8px 16px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981', boxShadow: '0 0 8px #10b981' }}></div>
          <span style={{ fontSize: '13px', color: '#d1d5db' }}>{user.name} ({user.role})</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        <Card title="Monthly Revenue" subtitle="Realtime sales figures">
          <div style={{ fontSize: '32px', fontWeight: '700', color: '#10b981', margin: '8px 0' }}>
            ${sales.toLocaleString()}
          </div>
          <p style={{ margin: 0, fontSize: '12px', color: '#9ca3af' }}>
            ↑ 12.4% from last month
          </p>
        </Card>

        <Card title="Active Connections" subtitle="Users currently online">
          <div style={{ fontSize: '32px', fontWeight: '700', color: '#6366f1', margin: '8px 0' }}>
            {activeUsers}
          </div>
          <p style={{ margin: 0, fontSize: '12px', color: '#9ca3af' }}>
            Active websocket subscriptions
          </p>
        </Card>

        <Card title="System Status" subtitle="Cluster resource allocation">
          <div style={{ fontSize: '32px', fontWeight: '700', color: '#f59e0b', margin: '8px 0' }}>
            98.4%
          </div>
          <p style={{ margin: 0, fontSize: '12px', color: '#9ca3af' }}>
            All systems nominal (3 remotes)
          </p>
        </Card>
      </div>

      <Card title="Live Operational Control" subtitle="Simulate telemetry actions directly within this microfrontend container">
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Button variant="primary" onClick={simulateActivity}>
            Trigger Sales Alert
          </Button>
          <Button variant="secondary" onClick={() => { setSales(142380); setActiveUsers(842); }}>
            Reset Metrics
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;

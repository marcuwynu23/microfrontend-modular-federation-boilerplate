import React, { useState } from 'react';
import { Card, Button } from '@mfe/shared-ui';

export interface ProfileProps {
  initialName?: string;
  initialRole?: string;
  onUpdate?: (name: string, role: string) => void;
}

export const Profile: React.FC<ProfileProps> = ({
  initialName = 'Sarah Jenkins',
  initialRole = 'Senior Security Analyst',
  onUpdate
}) => {
  const [name, setName] = useState(initialName);
  const [role, setRole] = useState(initialRole);
  const [status, setStatus] = useState('🟢 Active / Secure');
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(initialName);
  const [editRole, setEditRole] = useState(initialRole);

  const handleSave = () => {
    setName(editName);
    setRole(editRole);
    setIsEditing(false);
    if (onUpdate) {
      onUpdate(editName, editRole);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: "'Outfit', 'Inter', sans-serif", color: '#ffffff' }}>
      <div style={{ marginBottom: '24px' }}>
        <span style={{ fontSize: '12px', fontWeight: '600', color: '#10b981', textTransform: 'uppercase', letterSpacing: '1px' }}>
          Micro Frontend Module: remote2
        </span>
        <h2 style={{ margin: '4px 0 0 0', fontSize: '28px', fontWeight: '700', letterSpacing: '-0.5px' }}>
          Identity & Security
        </h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <Card>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative' }}>
              <div style={{
                width: '96px',
                height: '96px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #10b981 0%, #6366f1 100%)',
                padding: '3px',
                boxShadow: '0 0 20px rgba(99, 102, 241, 0.3)',
              }}>
                <div style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  backgroundColor: '#0b0f19',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '36px',
                  fontWeight: '700',
                  color: '#ffffff',
                }}>
                  {name.charAt(0)}
                </div>
              </div>
              <div style={{
                position: 'absolute',
                bottom: '2px',
                right: '2px',
                backgroundColor: '#10b981',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                border: '3px solid #0b0f19',
              }}></div>
            </div>

            <div style={{ flex: '1', minWidth: '200px' }}>
              {isEditing ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#9ca3af', marginBottom: '4px' }}>Name</label>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '6px',
                        color: '#ffffff',
                        fontSize: '14px',
                        outline: 'none',
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#9ca3af', marginBottom: '4px' }}>Role</label>
                    <input
                      type="text"
                      value={editRole}
                      onChange={(e) => setEditRole(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '6px',
                        color: '#ffffff',
                        fontSize: '14px',
                        outline: 'none',
                      }}
                    />
                  </div>
                  <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                    <Button variant="primary" onClick={handleSave} style={{ padding: '8px 16px', fontSize: '12px' }}>
                      Save Changes
                    </Button>
                    <Button variant="secondary" onClick={() => setIsEditing(false)} style={{ padding: '8px 16px', fontSize: '12px' }}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <h3 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: '#ffffff' }}>{name}</h3>
                  <p style={{ margin: '4px 0 12px 0', fontSize: '14px', color: '#9ca3af' }}>{role}</p>
                  
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <span style={{ fontSize: '12px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '4px 8px', borderRadius: '4px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                      {status}
                    </span>
                    <Button variant="secondary" onClick={() => setIsEditing(true)} style={{ padding: '6px 12px', fontSize: '12px', borderRadius: '6px' }}>
                      Modify Identity
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>

        <Card title="Security Preferences" subtitle="MFA & cryptographic session key details">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.03)', paddingBottom: '8px' }}>
              <span style={{ fontSize: '14px', color: '#9ca3af' }}>MFA Status</span>
              <span style={{ fontSize: '14px', color: '#10b981', fontWeight: '600' }}>Enabled (TOTP)</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.03)', paddingBottom: '8px' }}>
              <span style={{ fontSize: '14px', color: '#9ca3af' }}>Signing Key</span>
              <span style={{ fontSize: '14px', color: '#a78bfa', fontFamily: 'monospace' }}>Ed25519_pub_f901...</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '14px', color: '#9ca3af' }}>Last Access Location</span>
              <span style={{ fontSize: '14px', color: '#d1d5db' }}>Singapore (103.45.2.1)</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;

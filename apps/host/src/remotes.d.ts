declare module 'remote1/Dashboard' {
  import React from 'react';
  
  export interface DashboardProps {
    user?: { name: string; role: string };
  }
  
  const Dashboard: React.ComponentType<DashboardProps>;
  export default Dashboard;
}

declare module 'remote2/Profile' {
  import React from 'react';
  
  export interface ProfileProps {
    initialName?: string;
    initialRole?: string;
    onUpdate?: (name: string, role: string) => void;
  }
  
  const Profile: React.ComponentType<ProfileProps>;
  export default Profile;
}

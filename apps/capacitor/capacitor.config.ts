import type { CapacitorConfig } from '@capacitor/cli';

const isDev = process.env.CAP_DEV === 'true';

const config: CapacitorConfig = {
  appId: 'com.mfe.portal',
  appName: 'MFE Portal',
  webDir: '../host/dist',

  ...(isDev && {
    server: {
      url: 'http://10.0.2.2:5000',
      cleartext: true,
    },
  }),

  ...(!isDev && {
    server: {
      cleartext: true,
    },
  }),
};

export default config;

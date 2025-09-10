declare module 'next-pwa' {
  import { NextConfig } from 'next';

  interface PWAConfig {
    dest?: string;
    register?: boolean;
    skipWaiting?: boolean;
    disable?: boolean;
    [key: string]: any;
  }

  interface NextConfigWithPWA extends NextConfig {
    pwa?: PWAConfig;
  }

  function withPWA(config: NextConfigWithPWA): (config: NextConfig) => NextConfig;

  export default withPWA;
}

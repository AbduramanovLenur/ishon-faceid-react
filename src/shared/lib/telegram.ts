import {
  init,
  isTMA,
  miniApp,
  expandViewport,
  retrieveLaunchParams,
  retrieveRawInitData,
} from '@telegram-apps/sdk';

if (import.meta.env.DEV) {
  void import('eruda').then(({ default: eruda }) => eruda.init());
}

export const insideTelegram = isTMA();
const launchParams = insideTelegram ? retrieveLaunchParams() : undefined;

if (insideTelegram) {
  init();
  miniApp.ready();
  expandViewport();
}

export const initData = launchParams ? (retrieveRawInitData() ?? '') : '';
export const initDataUnsafe = launchParams?.tgWebAppData ?? {};
export const startParam = launchParams?.tgWebAppStartParam ?? null;
export const initDataHash = initData
  ? new URLSearchParams(initData).get('hash') ?? ''
  : '';

if (import.meta.env.DEV) {
  console.log('initData (raw):', initData);
  console.log('initDataUnsafe:', initDataUnsafe);
  console.log('start_param:', startParam);
}

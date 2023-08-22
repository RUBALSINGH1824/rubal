import { Notification as Toast } from 'rsuite';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';
import { getMessaging, isSupported, onMessage } from 'firebase/messaging';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';
import { isLocalhost } from './helpers';

const config = {
  apiKey: 'AIzaSyDG20Mk72tzL131TcEE8rSNliXk11P0sjs',
  authDomain: 'rubal-a82fb.firebaseapp.com',
  projectId: 'rubal-a82fb',
  storageBucket: 'rubal-a82fb.appspot.com',
  messagingSenderId: '543637030247',
  appId: '1:543637030247:web:3db3b00b235a76c3505bc2',
  measurementId: 'G-Y1803QJFBB',
};

export const fcmVapidKey =
  'BDn18_8iKva4QpLtryfwLRpAelNqaeAt2kwhrDsqGZX-oxLr_zOcqHotEB-lmss6QLdxF8Tlhj0H-VDAktWfbkg';

const app = initializeApp(config);
export const auth = getAuth(app);
export const database = getDatabase(app);
export const storage = getStorage(app);
export const functions = getFunctions(app, 'europe-west3');

export const messaging = isSupported() ? getMessaging(app) : null;

if (messaging) {
  onMessage(messaging, ({ notification }) => {
    const { title, body } = notification;
    Toast.info({ title, description: body, duration: 0 });
  });
}

if (isLocalhost) {
  connectFunctionsEmulator(functions, 'localhost', 5001);
}

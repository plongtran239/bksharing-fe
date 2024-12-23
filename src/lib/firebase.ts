import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

import envConfig from "@/config";

const firebaseConfig = {
  apiKey: envConfig.firebaseConfig.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: envConfig.firebaseConfig.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: envConfig.firebaseConfig.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: envConfig.firebaseConfig.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: envConfig.firebaseConfig.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: envConfig.firebaseConfig.NEXT_PUBLIC_APP_ID,
  measurementId: envConfig.firebaseConfig.NEXT_PUBLIC_MEASUREMENT_ID,
};

export const vapidKey = envConfig.firebaseConfig.NEXT_PUBLIC_VAPID_KEY;

const firebaseApp = initializeApp(firebaseConfig);

const generateFcmToken = async () => {
  try {
    const messaging = getMessaging(firebaseApp);

    const token = await getToken(messaging, {
      vapidKey,
    });

    return token;
  } catch (error) {
    console.error({ error });
  }
};

export { generateFcmToken };

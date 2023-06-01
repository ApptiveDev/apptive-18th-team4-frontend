import React, { useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyAlrAfEdNzPk3D9BBp_4uMrSAlGJKUNTMw",
  authDomain: "pnu-allimi-46b64.firebaseapp.com",
  projectId: "pnu-allimi-46b64",
  storageBucket: "pnu-allimi-46b64.appspot.com",
  messagingSenderId: "371671286586",
  appId: "1:371671286586:web:4630d565f9bd3b13e1c603",
  measurementId: "G-PXGFJZTVQF"
};

//const app = initializeApp(firebaseConfig);
//const messaging = getMessaging(app);

const MessageComponent = () => {
  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const messaging = getMessaging(app);

    async function requestPermission() {
      console.log('권한 요청 중...');

      const permission = await Notification.requestPermission();
      if (permission === 'denied') {
        console.log('알림 권한 허용 안됨');
        return;
      }

      console.log('알림 권한이 허용됨');

      const token = await getToken(messaging, {
        vapidKey:
          'BAyfLKDdU6TDMvb_K74ZfDHHdDymrVncufuBDVAToUkeET-LIZYzxhXZZ6r1DkPOfpidj2XV-LlNWKzU5Kv5qTU',
      });

      if (token) console.log('token: ', token);
      else console.log('Cannot get Token');

      onMessage(messaging, (payload) => {
        console.log('메시지가 도착했습니다.', payload);
        // ...
      });
    }

    requestPermission();
  }, []);

  return <div>FCM Test</div>;
};

export default MessageComponent;

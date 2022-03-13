import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyABnLHc1LCZkg594BXW-8JFFMSRVogunus",
    authDomain: "quizapp-46d30.firebaseapp.com",
    projectId: "quizapp-46d30",
    storageBucket: "quizapp-46d30.appspot.com",
    messagingSenderId: "998843659087",
    appId: "1:998843659087:web:eefaa433855037d2facb3a"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  export const auth = getAuth(app);
  export default app;
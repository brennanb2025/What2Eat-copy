import { useCallback, useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, update } from 'firebase/database';
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
const firebaseConfig = {
  apiKey: 'AIzaSyCPDUe0i0AcAo6ewNlTGL3Zc4xJ8jy8hog',
  authDomain: 'what2eat-a26a4.firebaseapp.com',
  databaseURL: 'https://what2eat-a26a4-default-rtdb.firebaseio.com',
  projectId: 'what2eat-a26a4',
  storageBucket: 'what2eat-a26a4.appspot.com',
  messagingSenderId: '560991683435',
  appId: '1:560991683435:web:214ced1506a2db293dc22e',
  measurementId: 'G-9JQS3DZSJG',
};

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

export const useDbData = (path) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!path) return;

    const dataRef = ref(database, path);

    const unsubscribe = onValue(
      dataRef,
      (snapshot) => {
        setData(snapshot.val());
      },
      (err) => {
        setError(err);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [path]);

  return [data, error];
};

const makeResult = (error) => {
  const timestamp = Date.now();
  const message =
    error?.message || `Updated: ${new Date(timestamp).toLocaleString()}`;
  return { timestamp, error, message };
};

export const useDbUpdate = (path) => {
  const [result, setResult] = useState();
  const updateData = useCallback(
    (value) => {
      update(ref(database, path), value)
        .then(() => setResult(makeResult()))
        .catch((error) => setResult(makeResult(error)));
    },
    [database, path]
  );

  return [updateData, result];
};

export const signInWithGoogle = () => {
  signInWithPopup(getAuth(firebase), new GoogleAuthProvider());
};

const firebaseSignOut = () => signOut(getAuth(firebase));

export { firebaseSignOut as signOut };

export const useAuthState = () => {
  const [user, setUser] = useState();

  useEffect(() => onAuthStateChanged(getAuth(firebase), setUser), []);

  return [user];
};

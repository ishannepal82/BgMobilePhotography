import {
  collection,
  getDocs,
} from 'firebase/firestore'
import {db} from '../../firebaseconfig'

export const useDashboard = () => {
  
  const handleGetDashboard = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'gallery'));
      const data = querySnapshot.docs.map((doc) => doc.data());
      return data;
    }
    catch (err) {
      console.log(err);
      return [];
    }
  }

  return { handleGetDashboard };
}
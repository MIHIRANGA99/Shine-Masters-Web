import {
  User,
  UserCredential,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
} from "firebase/firestore";
import { auth, database } from "./config";
import { FirebaseError } from "firebase/app";

export const registerUser = (
  email: string,
  password: string,
  username: string,
  onSuccess: (res: UserCredential) => void,
  onError: (err: FirebaseError) => void
) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((res) => {
      // TODO: Remove This
      console.log("Registration Successfull!");

      if (auth.currentUser != null) {
        updateProfile(auth.currentUser, {
          displayName: username,
        });
        onSuccess(res);
      } else {
        console.error("User not found");
      }
    })
    .catch((e) => {
      onError(e);
    });
};

export const loginUser = (
  email: string,
  password: string,
  onSuccess: (res: User) => void,
  onError: (err: FirebaseError) => void
) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((res) => {
      onSuccess(res.user);
    })
    .catch((e: FirebaseError) => {
      if (e.code === "auth/invalid-credential") {
        //showToast("Invalid credentials!");
      } else {
        onError(e);
      }
    });
};

export const logoutUser = () => {
  signOut(auth);
};

export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

export const createData = (
  collectionName: string,
  data: any,
  docId: string,
  onSuccess: (res: any) => void,
  onError: (err: FirebaseError) => void
) => {
  setDoc(doc(database, collectionName, docId), data)
    .then((res) => {
      onSuccess(res);
    })
    .catch((e) => {
      console.error(e.message);
      onError(e);
    });
};

export const getDataFromCollection = async (collectionName: COLLECTIONS) => {
  let dataList: any[] = [];

  const q = query(collection(database, collectionName));
  const documents = await getDocs(q);
  documents.forEach((doc) => {
    dataList.push({ ...doc.data(), id: doc.id });
  });

  return dataList;
};

export const getSingleDataFromCollection = async (
  collectionName: COLLECTIONS,
  docId: string
) => {
  const ref = doc(database, collectionName, docId);

  const document = await getDoc(ref);
  if (document.exists()) {
    return document.data();
  } else {
    return { error: "Document not found" };
  }
};

export const updateFromCollection = async (
  collectionName: COLLECTIONS,
  updatedData: any,
  docId: string,
  onSuccess: (res: any) => void,
  onError: (err: FirebaseError) => void
) => {
  const ref = doc(database, collectionName, docId);

  await setDoc(ref, updatedData)
    .then((res) => {
      onSuccess(res);
    })
    .catch((e) => {
      console.error(e);
      onError(e);
    });
};

export const deleteFromCollection = async (
  collectionName: COLLECTIONS,
  docId: string,
  onSuccess: (res: any) => void,
  onError: (err: FirebaseError) => void
) => {
  await deleteDoc(doc(database, collectionName, docId))
    .then((res) => {
      onSuccess(res);
    })
    .catch((e) => {
      onError(e);
    });
};

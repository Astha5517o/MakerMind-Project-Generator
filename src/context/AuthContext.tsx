import React, { createContext, useContext, useEffect, useState } from "react";
import { 
  User,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInAnonymously,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  updateProfile as updateAuthProfile
} from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, googleProvider, db } from "../lib/firebase";
import { UserProfile } from "../types";

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, pass: string) => Promise<void>;
  signUpWithEmail: (email: string, pass: string, name: string, institution?: string, gradeClass?: string) => Promise<void>;
  signInAsGuest: () => Promise<void>;
  updateProfileData: (data: Partial<UserProfile>) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Sync profile from Firestore when user changes
  const fetchUserProfile = async (currentUser: User) => {
    try {
      const userRef = doc(db, "users", currentUser.uid);
      const snap = await getDoc(userRef);

      if (snap.exists()) {
        setUserProfile(snap.data() as UserProfile);
      } else {
        // Create initial profile in Firestore
        const newProfile: UserProfile = {
          uid: currentUser.uid,
          name: currentUser.displayName || (currentUser.isAnonymous ? "Guest Scholar" : currentUser.email?.split("@")[0] || "Student Maker"),
          email: currentUser.email || `${currentUser.uid.slice(0, 8)}@guest.makermind`,
          institution: "STEM Science Fair Academy",
          gradeClass: "Class 10-12 / Science Wing",
          teamMembers: "Self (Single Lead)",
          createdAt: new Date().toISOString()
        };
        await setDoc(userRef, newProfile);
        setUserProfile(newProfile);
      }
    } catch (err) {
      console.warn("Could not fetch user profile from Firestore:", err);
      // Fallback local memory profile
      setUserProfile({
        uid: currentUser.uid,
        name: currentUser.displayName || (currentUser.isAnonymous ? "Guest Scholar" : currentUser.email?.split("@")[0] || "Student"),
        email: currentUser.email || "guest@makermind.local",
        institution: "STEM Academy",
        createdAt: new Date().toISOString()
      });
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        await fetchUserProfile(currentUser);
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const res = await signInWithPopup(auth, googleProvider);
      await fetchUserProfile(res.user);
    } catch (err: any) {
      console.error("Google sign-in error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signInWithEmail = async (email: string, pass: string) => {
    setLoading(true);
    try {
      const res = await signInWithEmailAndPassword(auth, email, pass);
      await fetchUserProfile(res.user);
    } catch (err: any) {
      console.error("Email sign-in error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signUpWithEmail = async (
    email: string, 
    pass: string, 
    name: string, 
    institution?: string, 
    gradeClass?: string
  ) => {
    setLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, pass);
      if (name) {
        await updateAuthProfile(res.user, { displayName: name });
      }

      const initialProfile: UserProfile = {
        uid: res.user.uid,
        name: name || email.split("@")[0],
        email: email,
        institution: institution || "Science Exhibition Club",
        gradeClass: gradeClass || "Class 10-12 / Engineering",
        teamMembers: "Lead Innovator",
        createdAt: new Date().toISOString()
      };

      const userRef = doc(db, "users", res.user.uid);
      await setDoc(userRef, initialProfile);
      setUserProfile(initialProfile);
    } catch (err: any) {
      console.error("Sign-up error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signInAsGuest = async () => {
    setLoading(true);
    try {
      const res = await signInAnonymously(auth);
      await fetchUserProfile(res.user);
    } catch (err: any) {
      console.error("Guest sign-in error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateProfileData = async (data: Partial<UserProfile>) => {
    if (!user) return;
    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        ...data,
        updatedAt: new Date().toISOString()
      });
      setUserProfile((prev) => (prev ? { ...prev, ...data } : null));
    } catch (err) {
      console.error("Profile update error:", err);
      throw err;
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      setUser(null);
      setUserProfile(null);
    } catch (err) {
      console.error("Sign-out error:", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        loading,
        signInWithGoogle,
        signInWithEmail,
        signUpWithEmail,
        signInAsGuest,
        updateProfileData,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

import { 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  deleteDoc, 
  updateDoc, 
  query, 
  orderBy, 
  onSnapshot 
} from "firebase/firestore";
import { db } from "./firebase";
import { ProjectBlueprint } from "../types";

/**
 * Save or overwrite a project blueprint in the user's Firestore subcollection
 * Path: /users/{userId}/projects/{projectId}
 */
export async function saveProjectToFirestore(userId: string, project: ProjectBlueprint): Promise<void> {
  if (!userId || !project.id) return;
  const projectRef = doc(db, "users", userId, "projects", project.id);
  const payload = {
    ...project,
    userId,
    updatedAt: new Date().toISOString()
  };
  await setDoc(projectRef, payload, { merge: true });
}

/**
 * Fetch all saved projects for a user
 */
export async function getUserProjectsFromFirestore(userId: string): Promise<ProjectBlueprint[]> {
  if (!userId) return [];
  try {
    const collRef = collection(db, "users", userId, "projects");
    const snap = await getDocs(collRef);
    const list: ProjectBlueprint[] = [];
    snap.forEach((d) => {
      list.push(d.data() as ProjectBlueprint);
    });
    return list;
  } catch (err) {
    console.error("Error fetching projects from Firestore:", err);
    return [];
  }
}

export const getUserProjects = getUserProjectsFromFirestore;

/**
 * Real-time subscription to user's saved projects
 */
export function subscribeToUserProjects(
  userId: string, 
  onUpdate: (projects: ProjectBlueprint[]) => void
) {
  if (!userId) return () => {};
  const collRef = collection(db, "users", userId, "projects");
  
  return onSnapshot(
    collRef, 
    (snap) => {
      const list: ProjectBlueprint[] = [];
      snap.forEach((d) => {
        list.push(d.data() as ProjectBlueprint);
      });
      onUpdate(list);
    },
    (error) => {
      console.warn("Firestore snapshot error (may be offline):", error);
    }
  );
}

/**
 * Delete a project from Firestore
 */
export async function deleteProjectFromFirestore(userId: string, projectId: string): Promise<void> {
  if (!userId || !projectId) return;
  const projectRef = doc(db, "users", userId, "projects", projectId);
  await deleteDoc(projectRef);
}

/**
 * Update specific fields in a project (e.g. student notes, exhibition checklist, log entries)
 */
export async function updateProjectInFirestore(
  userId: string, 
  projectId: string, 
  updates: Partial<ProjectBlueprint>
): Promise<void> {
  if (!userId || !projectId) return;
  const projectRef = doc(db, "users", userId, "projects", projectId);
  await updateDoc(projectRef, {
    ...updates,
    updatedAt: new Date().toISOString()
  });
}

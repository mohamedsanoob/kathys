import { collection, getDocs, DocumentData } from "firebase/firestore";
import { db } from "@/firebase/firebase"; // Adjust the path as needed

// Define an interface for your document data (replace with your actual data structure)
interface DocumentInterface extends DocumentData {
  id: string;
}

export const getAllDocuments = async (
  collectionName: string
): Promise<DocumentInterface[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const data: DocumentInterface[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return data;
  } catch (error) {
    console.error("Error fetching documents:", error);
    throw error;
  }
};

import {
  collection,
  getDocs,
  DocumentData,
  where,
  query,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";

interface DocumentInterface extends DocumentData {
  id: string;
}
interface Category {
  active: boolean;
  categoryName: string;
  // createdDate: any; // Timestamp or Date
  description: string;
  desktopBanner: string | null;
  id: string;
  images: string[];
  isSubcategory: boolean;
  mobileBanner: string | null;
  parentCategory: {
    categoryId: string;
    categoryName: string;
  };
  products: string[]; // Array of product IDs
}

export const getAllProducts = async (
  collectionName: string
): Promise<DocumentInterface[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const data: DocumentInterface[] = querySnapshot.docs.map((doc) => {
      const docData = doc.data();
      return {
        id: doc.id,
        ...docData,
        createdDate: docData.createdDate?.toDate?.()
          ? docData.createdDate.toDate().toISOString()
          : undefined,
        updatedDate: docData.updatedDate?.toDate?.()
          ? docData.updatedDate.toDate().toISOString()
          : undefined,
      };
    });
    return data;
  } catch (error) {
    console.error("Error fetching documents:", error);
    throw error;
  }
};

export const getCategories = async (
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

export const getProductById = async (
  productId: string,
  collectionName: string = "products"
): Promise<DocumentInterface | null> => {
  try {
    const productsRef = collection(db, collectionName);
    const q = query(productsRef, where("id", "==", productId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    const doc = querySnapshot.docs[0];
    const docData = doc.data();

    return {
      id: doc.id,
      ...docData,
      createdDate: docData.createdDate?.toDate?.()
        ? docData.createdDate.toDate().toISOString()
        : undefined,
      updatedDate: docData.updatedDate?.toDate?.()
        ? docData.updatedDate.toDate().toISOString()
        : undefined,
    };
  } catch (error) {
    console.error("Error fetching documents:", error);
    throw error;
  }
};

export const getCategoryByName = async (
  categoryName: string
): Promise<Category | null> => {
  try {
    const categoriesCollection = collection(db, "categories");
    const q = query(
      categoriesCollection,
      where("categoryName", "==", categoryName)
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      const categoryData = doc.data() as Category; // Type assertion

      if (categoryData) {
        // Create a new object with the document ID and all other properties except the original id
        const result = { ...categoryData, id: doc.id };
        return result;
      } else {
        return null;
      }
    } else {
      return null; // Category not found
    }
  } catch (error) {
    console.error("Error fetching category:", error);
    return null; // Handle the error gracefully
  }
};

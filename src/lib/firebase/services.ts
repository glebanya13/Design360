import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp,
  DocumentData,
  QueryDocumentSnapshot
} from 'firebase/firestore';
import { db } from './config';

export interface Product {
  id?: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  slug?: string;
  subcategory?: string;
  inStock?: boolean;
  oldPrice?: number;
  badge?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface Service {
  id?: string;
  title: string;
  description: string;
  price: string;
  features: string[];
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface Package {
  id?: string;
  name: string;
  targetAudience: string;
  visualizations: number | string;
  price: string;
  description: string;
  highlighted?: boolean;
  order: number;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface CatalogCategory {
  id?: string;
  name: string;
  order: number;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface ServiceCategory {
  id?: string;
  name: string;
  route?: string;
  order: number;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface SiteSettings {
  id?: string;
  site: {
    title: string;
    description: string;
    phone: string;
    email: string;
    address: string;
  };
  settings: {
    theme: {
      primaryColor: string;
      secondaryColor: string;
      accentColor: string;
    };
    seo: {
      metaTitle: string;
      metaDescription: string;
      keywords: string[];
    };
    contact: {
      workingHours: string;
      socialMedia: {
        instagram: string;
        telegram: string;
        whatsapp: string;
      };
    };
  };
  updatedAt?: Timestamp;
}

export const productsService = {
  async getAll(): Promise<Product[]> {
    if (!db) {
      throw new Error('Firebase не инициализирован. Убедитесь, что код выполняется на клиенте.');
    }
    const productsRef = collection(db, 'products');
    const snapshot = await getDocs(productsRef);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Product));
  },

  async getById(id: string): Promise<Product | null> {
    if (!db) {
      throw new Error('Firebase не инициализирован. Убедитесь, что код выполняется на клиенте.');
    }
    const docRef = doc(db, 'products', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Product;
    }
    return null;
  },

  async create(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    if (!db) {
      throw new Error('Firebase не инициализирован. Убедитесь, что код выполняется на клиенте.');
    }
    const productsRef = collection(db, 'products');
    const newDocRef = doc(productsRef);
    await setDoc(newDocRef, {
      ...product,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return newDocRef.id;
  },

  async update(id: string, product: Partial<Product>): Promise<void> {
    if (!db) {
      throw new Error('Firebase не инициализирован. Убедитесь, что код выполняется на клиенте.');
    }
    const docRef = doc(db, 'products', id);
    await updateDoc(docRef, {
      ...product,
      updatedAt: Timestamp.now()
    });
  },

  async delete(id: string): Promise<void> {
    if (!db) {
      throw new Error('Firebase не инициализирован. Убедитесь, что код выполняется на клиенте.');
    }
    const docRef = doc(db, 'products', id);
    await deleteDoc(docRef);
  }
};

export const servicesService = {
  async getAll(): Promise<Service[]> {
    if (!db) {
      throw new Error('Firebase не инициализирован. Убедитесь, что код выполняется на клиенте.');
    }
    const servicesRef = collection(db, 'services');
    const snapshot = await getDocs(servicesRef);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Service));
  },

  async getById(id: string): Promise<Service | null> {
    if (!db) {
      throw new Error('Firebase не инициализирован. Убедитесь, что код выполняется на клиенте.');
    }
    const docRef = doc(db, 'services', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Service;
    }
    return null;
  },

  async create(service: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    if (!db) {
      throw new Error('Firebase не инициализирован. Убедитесь, что код выполняется на клиенте.');
    }
    const servicesRef = collection(db, 'services');
    const newDocRef = doc(servicesRef);
    await setDoc(newDocRef, {
      ...service,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return newDocRef.id;
  },

  async update(id: string, service: Partial<Service>): Promise<void> {
    if (!db) {
      throw new Error('Firebase не инициализирован. Убедитесь, что код выполняется на клиенте.');
    }
    const docRef = doc(db, 'services', id);
    await updateDoc(docRef, {
      ...service,
      updatedAt: Timestamp.now()
    });
  },

  async delete(id: string): Promise<void> {
    if (!db) {
      throw new Error('Firebase не инициализирован. Убедитесь, что код выполняется на клиенте.');
    }
    const docRef = doc(db, 'services', id);
    await deleteDoc(docRef);
  }
};

export const settingsService = {
  async get(): Promise<SiteSettings | null> {
    if (!db) {
      throw new Error('Firebase не инициализирован. Убедитесь, что код выполняется на клиенте.');
    }
    const docRef = doc(db, 'settings', 'site');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as SiteSettings;
    }
    return null;
  },

  async update(settings: Partial<SiteSettings>): Promise<void> {
    if (!db) {
      throw new Error('Firebase не инициализирован. Убедитесь, что код выполняется на клиенте.');
    }
    const docRef = doc(db, 'settings', 'site');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      await updateDoc(docRef, {
        ...settings,
        updatedAt: Timestamp.now()
      });
    } else {
      await setDoc(docRef, {
        ...settings,
        updatedAt: Timestamp.now()
      });
    }
  }
};

export const packagesService = {
  async getAll(): Promise<Package[]> {
    if (!db) {
      throw new Error('Firebase не инициализирован. Убедитесь, что код выполняется на клиенте.');
    }
    const packagesRef = collection(db, 'packages');
    const snapshot = await getDocs(packagesRef);
    const packages = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Package));
    return packages.sort((a, b) => (a.order || 0) - (b.order || 0));
  },

  async getById(id: string): Promise<Package | null> {
    if (!db) {
      throw new Error('Firebase не инициализирован. Убедитесь, что код выполняется на клиенте.');
    }
    const docRef = doc(db, 'packages', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Package;
    }
    return null;
  },

  async create(pkg: Omit<Package, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    if (!db) {
      throw new Error('Firebase не инициализирован. Убедитесь, что код выполняется на клиенте.');
    }
    const packagesRef = collection(db, 'packages');
    const newDocRef = doc(packagesRef);
    await setDoc(newDocRef, {
      ...pkg,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return newDocRef.id;
  },

  async update(id: string, pkg: Partial<Package>): Promise<void> {
    if (!db) {
      throw new Error('Firebase не инициализирован. Убедитесь, что код выполняется на клиенте.');
    }
    const docRef = doc(db, 'packages', id);
    await updateDoc(docRef, {
      ...pkg,
      updatedAt: Timestamp.now()
    });
  },

  async delete(id: string): Promise<void> {
    if (!db) {
      throw new Error('Firebase не инициализирован. Убедитесь, что код выполняется на клиенте.');
    }
    const docRef = doc(db, 'packages', id);
    await deleteDoc(docRef);
  }
};

export const catalogCategoriesService = {
  async getAll(): Promise<CatalogCategory[]> {
    if (!db) {
      throw new Error('Firebase не инициализирован. Убедитесь, что код выполняется на клиенте.');
    }
    const categoriesRef = collection(db, 'catalogCategories');
    const snapshot = await getDocs(categoriesRef);
    const categories = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as CatalogCategory));
    return categories.sort((a, b) => (a.order || 0) - (b.order || 0));
  },

  async create(category: Omit<CatalogCategory, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    if (!db) {
      throw new Error('Firebase не инициализирован. Убедитесь, что код выполняется на клиенте.');
    }
    const categoriesRef = collection(db, 'catalogCategories');
    const newDocRef = doc(categoriesRef);
    await setDoc(newDocRef, {
      ...category,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return newDocRef.id;
  },

  async update(id: string, category: Partial<CatalogCategory>): Promise<void> {
    if (!db) {
      throw new Error('Firebase не инициализирован. Убедитесь, что код выполняется на клиенте.');
    }
    const docRef = doc(db, 'catalogCategories', id);
    await updateDoc(docRef, {
      ...category,
      updatedAt: Timestamp.now()
    });
  },

  async delete(id: string): Promise<void> {
    if (!db) {
      throw new Error('Firebase не инициализирован. Убедитесь, что код выполняется на клиенте.');
    }
    const docRef = doc(db, 'catalogCategories', id);
    await deleteDoc(docRef);
  }
};

export const serviceCategoriesService = {
  async getAll(): Promise<ServiceCategory[]> {
    if (!db) {
      throw new Error('Firebase не инициализирован. Убедитесь, что код выполняется на клиенте.');
    }
    const categoriesRef = collection(db, 'serviceCategories');
    const snapshot = await getDocs(categoriesRef);
    const categories = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as ServiceCategory));
    return categories.sort((a, b) => (a.order || 0) - (b.order || 0));
  },

  async create(category: Omit<ServiceCategory, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    if (!db) {
      throw new Error('Firebase не инициализирован. Убедитесь, что код выполняется на клиенте.');
    }
    const categoriesRef = collection(db, 'serviceCategories');
    const newDocRef = doc(categoriesRef);
    await setDoc(newDocRef, {
      ...category,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return newDocRef.id;
  },

  async update(id: string, category: Partial<ServiceCategory>): Promise<void> {
    if (!db) {
      throw new Error('Firebase не инициализирован. Убедитесь, что код выполняется на клиенте.');
    }
    const docRef = doc(db, 'serviceCategories', id);
    await updateDoc(docRef, {
      ...category,
      updatedAt: Timestamp.now()
    });
  },

  async delete(id: string): Promise<void> {
    if (!db) {
      throw new Error('Firebase не инициализирован. Убедитесь, что код выполняется на клиенте.');
    }
    const docRef = doc(db, 'serviceCategories', id);
    await deleteDoc(docRef);
  }
};


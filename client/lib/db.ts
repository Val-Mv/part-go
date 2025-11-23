const DB_NAME = "PartGoDB";
const DB_VERSION = 1;
const STORE_PRODUCTS = "products";

export interface ProductDB {
  id: number;
  name: string;
  price: string;
  type: "ORIGINAL" | "GENERICO";
  image: string;
  warranty?: string;
}

export const db = {
  async open(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(STORE_PRODUCTS)) {
          db.createObjectStore(STORE_PRODUCTS, { keyPath: "id" });
        }
      };

      request.onsuccess = (event) => {
        resolve((event.target as IDBOpenDBRequest).result);
      };

      request.onerror = (event) => {
        reject((event.target as IDBOpenDBRequest).error);
      };
    });
  },

  async addProduct(product: ProductDB): Promise<void> {
    const database = await this.open();
    return new Promise((resolve, reject) => {
      const transaction = database.transaction([STORE_PRODUCTS], "readwrite");
      const store = transaction.objectStore(STORE_PRODUCTS);
      const request = store.put(product);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  },

  async getAllProducts(): Promise<ProductDB[]> {
    const database = await this.open();
    return new Promise((resolve, reject) => {
      const transaction = database.transaction([STORE_PRODUCTS], "readonly");
      const store = transaction.objectStore(STORE_PRODUCTS);
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  },

  async getProduct(id: number): Promise<ProductDB | undefined> {
    const database = await this.open();
    return new Promise((resolve, reject) => {
      const transaction = database.transaction([STORE_PRODUCTS], "readonly");
      const store = transaction.objectStore(STORE_PRODUCTS);
      const request = store.get(id);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  },
};

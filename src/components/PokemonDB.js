/* La clase `Database` proporciona métodos para interactuar con IndexedDB, incluida la apertura de una
base de datos, la recuperación de todos los datos de un almacén de objetos específico, la adición de
datos a un almacén, la actualización de datos en un almacén y la eliminación de datos de un almacén. */
export class Database {
    constructor(name, storeNames) {
        this.name = name;
        this.storeNames = storeNames;
        this.db = null;
    }

    /**
     * La función `open` abre de forma asincrónica una base de datos IndexedDB, crea almacenes de
     * objetos si es necesario y devuelve una promesa que se resuelve con la instancia de la base de
     * datos.
     * @returns La función `open()` devuelve una Promesa.
     */
    async open() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.name, 1);
            
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                this.storeNames.forEach(storeName => {
                    if (!db.objectStoreNames.contains(storeName)) {
                        db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
                    }
                });
            };

            request.onsuccess = (event) => {
                this.db = event.target.result;
                resolve(this.db);
            };

            request.onerror = (event) => {
                reject(event.target.error);
            };
        });
    }

    /**
     * La función `getAllData` recupera todos los datos de un almacén de objetos específico en una base
     * de datos usando IndexedDB.
     * @param storeName - `storeName` es un parámetro que representa el nombre del almacén de objetos
     * del cual desea recuperar datos de forma asincrónica utilizando IndexedDB.
     * @returns La función `getAllData` devuelve una Promesa que se resuelve con el resultado de
     * recuperar todos los datos del almacén de objetos especificado en la base de datos indexedDB.
     */
    async getAllData(storeName) {
        if (!this.db) {
            await this.open();
        }

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readonly');
            const store = transaction.objectStore(storeName);
            const request = store.getAll();

            request.onsuccess = (event) => {
                resolve(event.target.result);
            };

            request.onerror = (event) => {
                reject(event.target.error);
            };
        });
    }

    /**
     * La función `addData` agrega datos de forma asincrónica a un almacén específico de la base de
     * datos.
     * @param storeName - El parámetro `storeName` se refiere al nombre del almacén de objetos en la
     * base de datos IndexedDB donde desea agregar los `datos`.
     * @param data - El parámetro `datos` en la función `addData` representa los datos que desea
     * agregar al almacén de objetos especificado en la base de datos IndexedDB. Estos datos pueden
     * estar en cualquier formato que desee almacenar, como un objeto, cadena, número, matriz, etc. La
     * función `addData` convierte estos datos en un objeto de almacenamiento de objetos en la base de
     * datos IndexedDB.
     * @returns La función `addData` devuelve una Promesa.
     */
    async addData(storeName, data) {
        if (!this.db) {
            await this.open();
        }

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.add(data);

            request.onsuccess = (event) => {
                resolve(event.target.result);
            };

            request.onerror = (event) => {
                reject(event.target.error);
            };
        });
    }

    /**
     * La función `updateData` actualiza de forma asincrónica los datos en un almacén específico dentro
     * de una base de datos usando IndexedDB.
     * @param storeName - El parámetro `storeName` se refiere al nombre del almacén de objetos en la
     * base de datos IndexedDB donde desea actualizar los datos.
     * @param data - El parámetro `data` en la función `updateData` representa los nuevos datos que
     * desea actualizar en el almacén de objetos especificado (`storeName`) en la base de datos. Estos
     * datos se utilizarán para actualizar una entrada existente o crear una nueva entrada en el
     * almacén de objetos.
     * @returns La función `updateData` devuelve una Promesa.
     */
    async updateData(storeName, data) {
        if (!this.db) {
            await this.open();
        }

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.put(data);

            request.onsuccess = (event) => {
                resolve(event.target.result);
            };

            request.onerror = (event) => {
                reject(event.target.error);
            };
        });
    }

    /**
     * La función `deleteData` elimina de forma asincrónica un registro de un almacén de objetos
     * específico en una base de datos usando IndexedDB.
     * @param storeName - El parámetro `storeName` se refiere al nombre del almacén de objetos del que
     * desea eliminar datos. En IndexedDB, los datos se almacenan en almacenes de objetos dentro de una
     * base de datos. El parámetro `storeName` especifica el nombre del almacén de objetos del que
     * desea eliminar datos.
     * @param id - El parámetro `id` en la función `deleteData` representa el identificador único de la
     * entrada de datos que desea eliminar del `storeName` especificado en la base de datos.
     * @returns La función `deleteData` devuelve una Promesa.
     */
    async deleteData(storeName, id) {
        if (!this.db) {
            await this.open();
        }

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.delete(id);

            request.onsuccess = (event) => {
                resolve();
            };

            request.onerror = (event) => {
                reject(event.target.error);
            };
        });
    }
}

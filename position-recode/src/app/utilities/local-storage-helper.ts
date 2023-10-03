import { IStorage } from "../interfaces/IStorage";

export class LocalStorageHelper implements IStorage{
    /**
     * save
     */
     public save<T>(key: string, saveData: T): void {
        const json = JSON.stringify(saveData);
        localStorage.setItem(key, json);
    }

    /**
     * update
     */
    public update<T>(key: string, updateData: T): void {
        const json = JSON.stringify(updateData);
        localStorage[key] = json;
    }

    /**
     * select
     */
    public select<T>(key: string): T {
        const temp = localStorage.getItem(key);
        const parse = <T>JSON.parse(<string>temp);
        return parse;
    }

    /**
     * delete
     */
    public delete(key: string): void {
        localStorage.removeItem(key);
    }

    /**
     * reset
     */
    public reset() {
        localStorage.clear();
    }
}

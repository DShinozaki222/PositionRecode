export interface IStorage {
    /**
     * ストレージへの保存
     * @param key 
     * @param saveData 
     */
    save<T>(key: string, saveData: T): void
    
    /**
     * 保存しているデータの更新
     * @param key 
     * @param updateData 
     */
    update<T>(key: string, updateData: T): void

    /**
     * 保存したデータの取得
     * @param key 
     */
    select<T>(key: string): T

    /**
     * 指定したデータの削除
     * @param key 
     */
    delete(key: string): void

    /**
     * 全データの削除
     */
    reset(): void
}
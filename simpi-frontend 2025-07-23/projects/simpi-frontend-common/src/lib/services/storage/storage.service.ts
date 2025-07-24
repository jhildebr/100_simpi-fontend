import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

export class StorageService {

  public static async store(key: string, value: string): Promise<void> {
      return await Storage.set({
        key,
        value
      });
  }

  public static async retrieve(key: string): Promise<string> {
      const entry = await Storage.get({ key });
      return entry.value;
  }

  public static async removeItem(key: string): Promise<void> {
      return await Storage.remove({ key });
  }

}

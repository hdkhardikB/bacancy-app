import { Injectable } from '@angular/core';
import { LocalStorageEnum } from '../enums/local-storage.enumns';
import { LocalStorageService as StorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(private storage: StorageService) { }

  /**
   * To set local storage value
   * @param key - a key to which value will be stored.
   * @param value - a value to stored
   */
  set(key: LocalStorageEnum, value: any) {
    this.storage.store(key, value);
  }
  /**
   * To get localstorage value
   * @param key - key to be retrived.
   */
  get(key: LocalStorageEnum): any {
    return this.storage.retrieve(key);
  }

  /**
   * To remove localstorage by key
   * @param key - key to be removed
   */
  remove(key: string) {
    this.storage.clear(key);
  }

  /**
   * To remove all localstorage values
   */
  removeAll() {
    this.storage.clear();
  }
}

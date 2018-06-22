import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { LocalStorageEnum } from '../enums/local-storage.enumns';
@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor(private localStorageService: LocalStorageService) { }

  /**
   * Gets the app token
   */
  getToken(): String {
    return this.localStorageService.get(LocalStorageEnum.jwttoken);
  }

  /**
   * Sets the token to app storage.
   * @param token - a token string
   */
  saveToken(token: String) {
    this.localStorageService.set(LocalStorageEnum.jwttoken, token);
  }

  /**
   * Destroy json token
   */
  destroyToken() {
    this.localStorageService.remove(LocalStorageEnum.jwttoken);
  }
}

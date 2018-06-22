import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { JwtService } from './jwt.service';
import { LocalStorageEnum } from '../enums/local-storage.enumns';
import { User } from '../../account/user';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private localStorageService: LocalStorageService, private jwtService: JwtService) {

  }

  /**
   * To check if user is logged in.
   */
  isLoggedIn(): boolean {
    return this.jwtService.getToken() ? true : false;
  }

  /**
   * To get the details of logged in user.
   */
  getUser(): User {
    return this.localStorageService.get(LocalStorageEnum.user);
  }
}

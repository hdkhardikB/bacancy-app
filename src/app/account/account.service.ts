import { Injectable } from '@angular/core';
import { ApiUtilityService } from '../main/services/api-utility.service';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from './user';
import { LocalStorageService } from '../main/services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private api: ApiUtilityService,
    private localStorage: LocalStorageService
  ) { }

  /**
   * to login to system.
   * @param loginDetail - a type of object containing email and password.
   */
  login(loginDetail: any): Observable<any> {
    return this.api.post('user/loginUser', loginDetail);
  }

  /**
   * Creates the user to database.
   * @param userDetail - an object of user.
   */
  signup(userDetail: User): Observable<any> {
    return this.api.post('user/signup', userDetail);
  }

  /**
   * To check if email already exist or not.
   * @param email - an email of user.
   */
  checkvalidUser(email: String): Observable<boolean> {
    return this.api.get('user/checkvaliduser?email=' + email);
  }

  /**
   * Logout the user and remove all its app storage.
   */
  logoutUser() {
    this.localStorage.removeAll();
  }
}

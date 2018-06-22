import { Component, NgZone, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../main/services/auth.service';
import { AccountService } from '../account.service';
import { JwtService } from '../../main/services/jwt.service';
import { LocalStorageService } from '../../main/services/local-storage.service';
import { LocalStorageEnum } from '../../main/enums/local-storage.enumns';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginObject = {
    user: '',
    password: ''
  };
  hide = true; // to hide the password by default
  errorMessage = '';
  loginForm: FormGroup;
  constructor(private authService: AuthService,
    private router: Router,
    private zone: NgZone,
    private accountService: AccountService,
    private jwtService: JwtService,
    private localStorage: LocalStorageService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {

    //redirect to home page if already logged in.
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['core']);
    }
    this.loginForm = new FormGroup({
      'username': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required])
    });
  }

  /**
   * a function to login into the system.
   * @param loginObject - an object containing email and password.
   */
  login(loginObject: any) {
    this.spinner.show();
    this.accountService.login(loginObject).subscribe((resp: any) => {
      if (!resp.success) {
        this.errorMessage = 'Username or password went wrong.';
      } else {
        this.jwtService.saveToken(resp.token);
        this.localStorage.set(LocalStorageEnum.user, resp.user);
        this.zone.run(() => { // Change the property within the zone, CD will run after
          this.router.navigate(['core']);
        });
      }
    }, err => {
      this.errorMessage = err;
      this.spinner.hide();
    }, () => {
      this.spinner.hide();
    });
  }
}

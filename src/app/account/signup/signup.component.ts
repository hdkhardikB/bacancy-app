import { Component, NgZone, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../main/services/auth.service';
import { AccountService } from '../account.service';
import { JwtService } from '../../main/services/jwt.service';
import { LocalStorageService } from '../../main/services/local-storage.service';
import { LocalStorageEnum } from '../../main/enums/local-storage.enumns';
import { User } from '../user';
import { CustomValidator } from '../custom-validator';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupDetail = new User();
  errorMessage = '';
  signupForm: FormGroup;
  constructor(private authService: AuthService,
    private router: Router,
    private zone: NgZone,
    private accountService: AccountService,
    private jwtService: JwtService,
    private localStorage: LocalStorageService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    //If user is already logged in, then go to home page.
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['core']);
    }
    this.signupForm = new FormGroup({
      'firstname': new FormControl('', [Validators.required]),
      'lastname': new FormControl('', [Validators.required]),
      'email': new FormControl('', [Validators.required, Validators.email], [CustomValidator.uniqueUser(this.accountService)]),
      'mobileno': new FormControl('', [Validators.required, Validators.maxLength(10)]),
      'password': new FormControl('', [Validators.required])
    });
  }

  /**
   * The function to create user in db.
   */
  signUp() {
    this.spinner.show();
    this.accountService.signup(this.signupDetail).subscribe((resp: any) => {
      if (resp.success) {
        this.jwtService.saveToken(resp.token); //To store json to app storage.
        this.localStorage.set(LocalStorageEnum.user, resp.user); //To store user detail in app storage.
        this.zone.run(() => { // Change the property within the zone, CD will run after
          this.router.navigate(['core']);
        });
      }
    }, err => {
      this.spinner.hide();
    }, () => {
      this.spinner.hide();
    });

  }
}

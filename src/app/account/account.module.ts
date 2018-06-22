import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AccountRoutingModule } from './account-routing.module';
import { MainModule } from '../main/main.module';
import { DemoMaterialModule } from '../demo-material-module';
import { SignupComponent } from './signup/signup.component';
@NgModule({
  imports: [
    CommonModule, AccountRoutingModule, MainModule, DemoMaterialModule
  ],
  declarations: [LoginComponent, SignupComponent]
})
export class AccountModule { }

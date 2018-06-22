import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiUtilityService } from './services/api-utility.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { Ng2Webstorage } from 'ngx-webstorage';
import { JwtService } from './services/jwt.service';
@NgModule({
  imports: [
    CommonModule, Ng2Webstorage
  ], providers: [
    AuthGuard, AuthService, ApiUtilityService, JwtService
  ],
  declarations: []
})
export class MainModule { }

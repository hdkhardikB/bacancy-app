import * as $ from 'jquery';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { Headers, HttpModule, Response, URLSearchParams } from '@angular/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './demo-material-module';
import { CoreModule } from './core/core.module';
import { MainModule } from './main/main.module';
import { SharedModule } from './shared/shared.module';

import { SpinnerComponent } from './shared/spinner.component';
import { ToastrModule } from 'ngx-toastr';
import { FullComponent } from './layout/full/full.component';

import { EmptyComponent } from './layout/empty/empty.component';
import { AppHeaderComponent } from './layout/header/header.component';
@NgModule({
  declarations: [
    AppComponent, SpinnerComponent, FullComponent, EmptyComponent, AppHeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    FormsModule, HttpModule,
    FlexLayoutModule,
    HttpClientModule,
    SharedModule,
    AppRoutingModule, CoreModule, MainModule, ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    })
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

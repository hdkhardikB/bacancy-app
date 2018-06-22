import 'hammerjs';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { DemoMaterialModule } from '../demo-material-module';
import { CdkTableModule } from '@angular/cdk/table';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CoreRouting } from './core.routing';
import { ListViewComponent } from './list-view/list-view.component';
import { CoreDataService } from './core-data.service';

import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
@NgModule({
  imports: [
    CommonModule,
    CoreRouting,
    DemoMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule
  ],
  providers: [
    CoreDataService
  ],
  declarations: [
    ListViewComponent, ProductDetailComponent, ShoppingCartComponent
  ]
})

export class CoreModule { }

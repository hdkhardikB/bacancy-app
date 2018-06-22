// import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListViewComponent } from './list-view/list-view.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component'
const CoreRoutes: Routes = [
    {
        path: '',
        component: ListViewComponent
    },
    {
        path: 'product',
        component: ProductDetailComponent
    },
    {
        path: 'cart',
        component: ShoppingCartComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(CoreRoutes)],
    exports: [RouterModule]
})
export class CoreRouting { }



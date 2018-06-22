import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { Product } from '../models/Product';
import { AuthService } from '../../main/services/auth.service';
import { CoreDataService } from '../core-data.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  cart: Product[];
  cartTotal = 0;
  constructor(private shopingCart: ShoppingCartService,
    private auth: AuthService,
    private coreService: CoreDataService,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,

  ) {
    this.cart = this.shopingCart.getCart() || []; //To get the existing cart or initilize the cart.
    for (var i = 0; i <= this.cart.length - 1; i++) {
      this.cartTotal += this.cart[i].s_price; //To count the total cart value.
    }
  }

  ngOnInit() {
  }

  /**
   * Removes the item from shopping cart list.
   * @param product 
   */
  removeItem(product: Product) {
    this.cart = this.shopingCart.removeItem(product);
  }

  /**
   * To place an order to db.
   */
  placeOrder() {
    this.spinner.show();
    let orderDetail = { productIds: this.cart.map(p => { return p.ID }).join(), userId: this.auth.getUser().ID };
    this.coreService.placeOrder(orderDetail).subscribe(resp => {
      this.toaster.success('Your order has been placed successfully', 'Success');
      this.shopingCart.clearCart();
      this.router.navigate(['core']); //Navigate back to product listing
    }, err => {
      this.spinner.hide();
    }, () => {
      this.spinner.hide();
    });
  }

}

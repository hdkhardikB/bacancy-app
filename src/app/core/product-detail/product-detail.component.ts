import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CoreDataService } from '../core-data.service';
import { Product } from '../models/Product';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  constructor(private coreService: CoreDataService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private toastr: ToastrService,
    private shoppingCart: ShoppingCartService,
    private route: ActivatedRoute
  ) {
    
    //To get product id passed in query params
    this.route.queryParams.subscribe(params => {
      let productId = +params['id'] || 1;
      this.spinner.show();
      this.coreService.getProductDetail(productId).subscribe((res: any) => {
        this.product = res;
      }, err => {
        this.spinner.hide();
      }, () => {
        this.spinner.hide();
      });
    });
  }

  ngOnInit() {
  }

  /**
   * Adds an item selected by user to shopping cart.
   */
  addToCart() {
    this.shoppingCart.addToCart(this.product);
    this.router.navigateByUrl('core/cart');
  }

}

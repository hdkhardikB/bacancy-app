import { Injectable } from '@angular/core';

import { LocalStorageService } from '../main/services/local-storage.service';
import { LocalStorageEnum } from '../main/enums/local-storage.enumns';
import { Product } from './models/Product';
@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  shoppingCart: Product[];

  constructor(private storage: LocalStorageService) {
    this.shoppingCart = this.getCart() || [];
  }

  /**
   * Gets the shopping cart from app storage.
   */
  getCart() {
    this.shoppingCart = this.storage.get(LocalStorageEnum.cart);
    return this.shoppingCart;
  }

  /**
   * To add an item to shopping cart.
   * @param product - an object of product.
   */
  addToCart(product: Product) {
    this.shoppingCart.push(product);
    this.storage.set(LocalStorageEnum.cart, this.shoppingCart);
  }

  /**
   * Removes the given item from shopping cart list.
   * @param product - a product object to be removed.
   */
  removeItem(product: Product): Product[] {
    this.shoppingCart.splice(this.shoppingCart.indexOf(product), 1);
    this.storage.set(LocalStorageEnum.cart, this.shoppingCart); //Sets the shopping back to app storage.
    return this.shoppingCart;
  }

  /**
   * Clears the shopping cart and removes from app storage.
   */
  clearCart() {
    this.shoppingCart = [];
    this.storage.remove(LocalStorageEnum.cart);
  }
}

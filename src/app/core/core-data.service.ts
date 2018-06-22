import { Injectable } from '@angular/core';
import { ApiUtilityService } from '../main/services/api-utility.service';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Product } from './models/Product';
import { Category } from './models/Category';

@Injectable({
  providedIn: 'root'
})
export class CoreDataService {

  constructor(private api: ApiUtilityService) { }

  /**
   * To get the list of jobs out there.
   * @param categoryId - an id of category
   */
  getProducts(categoryId: Number): Observable<Product[]> {
    return this.api.get('products/getProductsByCategory' + (categoryId ? '?categoryId=' + categoryId : ''));
  }

  /**
   * To get the list of categories.
   */
  getCategories(): Observable<Category[]> {
    return this.api.get('categories/getAll');
  }

  /**
   * Get the detail of product based on product id.
   * @param productId - an id of product
   */
  getProductDetail(productId: Number): Observable<Product> {
    return this.api.get('products/getProductById?productId=' + productId);
  }

  /**
   * To place an order to database
   * @param orderDetail - an object containing productids and user id.
   */
  placeOrder(orderDetail: any): Observable<any> {
    return this.api.post('orders/save', orderDetail);
  }
}

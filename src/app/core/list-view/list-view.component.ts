import { Component, OnInit } from '@angular/core';
import { CoreDataService } from '../core-data.service';
import { Product } from '../models/Product';
import { Category } from '../models/Category';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit {
  products: Product[];
  categories: Category[] = [{ ID: 0, category_name: 'All' }];
  selectedCategory = this.categories[0];
  constructor(private coreService: CoreDataService,
    private spinner: NgxSpinnerService,
    private toaster: ToastrService
  ) { }

  ngOnInit() {
    this.spinner.show();
    //To get list of categories available
    this.coreService.getCategories().subscribe((data: Category[]) => {
      this.categories = this.categories.concat(data);
      this.getProductsByCategory(this.selectedCategory.ID)
    }, (err: any) => {
      this.spinner.hide();
    }, () => {
      this.spinner.hide();
    })
  }

  /**
   * An event to be called on change of category.
   */
  onStautsChange() {
    this.getProductsByCategory(this.selectedCategory.ID)
  }

  /**
   * Gets the products available for given category.
   * @param categoryId 
   */
  getProductsByCategory(categoryId) {
    this.spinner.show();
    this.coreService.getProducts(categoryId).subscribe((data: Product[]) => {
      this.products = data;
    }, (err: any) => {
      this.spinner.hide();
    }, () => {
      this.spinner.hide();
    });
  }
}

import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Product } from './product.model';
import { ApiService } from './Services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'product-app';
  products: any = [];
  editdata: Product = {};
  isModalShow: boolean = false;
  allItems: any = [];
   // pager object
   pager: any = {};
  constructor(private apiService: ApiService, private http: HttpClient) {

  }
  ngOnInit(): void {
    this.getProuductList();
    this.editdata = new Product();
    console.log(this.editdata, "editData");

  }
  getProuductList() {
    // this.apiService.getService().subscribe(response=>{
    //   console.log(response);
    // })
    this.http.get("assets/json/data.json").subscribe(data => {
      // console.log(data);
      this.allItems = data;
      // this.products = data;
      this.allItems.map(product => {
        // total number of stars
        const starTotal = 5;
        const starPercentage = (Number(product.productRating) / starTotal) * 100;
        const starPercentageRounded = `${(Math.round(starPercentage / 10) * 10)}%`;
        product.width = starPercentageRounded;
        product.showDelete = true;
        product.id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
      })
      console.log(this.allItems);
 // initialize to page 1
 this.setPage(1);
    })
  }
  edit(data) {
    console.log(data);
    this.editdata = JSON.parse(JSON.stringify(data))
    this.isModalShow = true;
  }
  delete(data) {
    console.log(data);
    let findIndex = this.products.findIndex(data => data.id == data.id);
    if (findIndex > -1) {
      this.products.splice(findIndex, 1)
    }
    // this.editdata=JSON.parse(JSON.stringify(data))
  }
  closeModal() {
    this.isModalShow = false;
  }
  addProduct() {
    this.editdata = new Product();
    this.isModalShow = true;
  }
  removeProductButton() {
    this.products.map(item => {
      item.showDelete = !item.showDelete;
    })
    console.log(this.products);

  }
  updateProduct() {
    if (this.editdata.id) {
      let findIndex = this.allItems.findIndex(data => data.id == this.editdata.id);
      if (findIndex > -1) {
        const starTotal = 5;
        const starPercentage = (Number(this.editdata.productRating) / starTotal) * 100;
        const starPercentageRounded = `${(Math.round(starPercentage / 10) * 10)}%`;
        this.editdata['width'] = starPercentageRounded;
        this.allItems[findIndex] = this.editdata
      }
    } else {
      this.editdata.id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
     
      this.editdata['showDelete'] = true;
      this.allItems.unshift(this.editdata)
    }
    this.setPage(1)
    this.isModalShow = false;
    console.log(this.products);

  }

  setPage(page: number) {
    // get pager object from service
    this.pager = this.apiService.getPager(this.allItems.length, page);
    // get current page of items
    this.products=[];
    this.products = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
}
}

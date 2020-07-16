import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  private _getProductsURL  = 'http://localhost:3000/products';
  private _addProductURL = 'http://localhost:3000/insert'; 
  private _deleteProductURL = 'http://localhost:3000/delete'
  private _getSingleProductURL  = 'http://localhost:3000/singleproduct';
  private _updateProductURL  = 'http://localhost:3000/edit';

  getProducts(){
    return this.http.get(this._getProductsURL);
  }

  getProduct(_id){
    return this.http.post(this._getSingleProductURL,{"_id":_id});
  }

  addProduct(item){
    return this.http.post(this._addProductURL,{"product":item})
  }

  deleteProduct(_id){
    return this.http.post(this._deleteProductURL,{"_id":_id})
  }
  updateProduct(item){
    return this.http.post(this._updateProductURL,{"product":item})
  }
 
}

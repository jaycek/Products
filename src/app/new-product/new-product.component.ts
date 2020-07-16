import { Component, OnInit } from '@angular/core';
import {ProductService} from '../product.service';
import {Router} from '@angular/router';
import {ProductModel} from '../product-list/product.model';
import { FormBuilder,Validators} from '@angular/forms';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  title:String="Add Product";
  constructor(private productService:ProductService,private router:Router,private fb:FormBuilder) { }
  product = new ProductModel(null,null,null,null,null,null,null,null);

 newProductForm = this.fb.group(

    { productId :['',Validators.required],
      productName:['',Validators.required],
      productCode:['',Validators.required],
      releaseDate:['',Validators.required],
      description:['',Validators.required],
      price:['',Validators.required],
      starRating:['',Validators.required],
      imageUrl:['',Validators.required]
    
    }

  )
  

  ngOnInit(): void {

  }

  addProduct(){
    
    this.productService.addProduct(this.product)
    .subscribe(data=>console.log(data))
    
    this.router.navigate(['/']);
  }
  
}

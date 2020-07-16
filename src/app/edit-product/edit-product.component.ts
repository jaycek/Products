import { Component, OnInit } from '@angular/core';
import {ProductService} from '../product.service';
import {Router} from '@angular/router';
import {ProductModel} from '../product-list/product.model';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder,Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  title:string="Edit Product Details"
  constructor(private productService:ProductService,private router:Router,private route: ActivatedRoute,private fb:FormBuilder) { }
  product = new ProductModel(null,null,null,null,null,null,null,null);
  productid:Number;
  
  
 editProductForm = this.fb.group(

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
    this.route.params.subscribe(params => {
      // get the id out of the route params
      this.productid = params['id'];
      console.log(this.productid);
      this.productService.getProduct(this.productid.toString())
      .subscribe((data)=>{
        //console.log(data);
        this.product=JSON.parse(JSON.stringify(data));
         
      })
    });
  
  }
saveProduct(){
  this.productService.updateProduct(this.product)
    .subscribe(data=>console.log(data)
    )
    
    this.router.navigate(['/']);
}
  

}

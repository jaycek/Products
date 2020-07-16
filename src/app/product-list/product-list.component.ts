import { Component, OnInit } from '@angular/core';
import {ProductModel} from './product.model';
import {ProductService} from '../product.service';
import {Router} from '@angular/router';
// import {ChangeDetectorRef} from '@angular/core';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  title:String="Product List";
  imageWidth:number=50;
  imageMargin:Number=2;

  showImage:Boolean = false;

  constructor(private productService:ProductService,private _router:Router) { }

  products:ProductModel[];

  toggleImage():void{
    this.showImage = !this.showImage;
  }

  selectedId: number;

ngOnChanges():void{
  this.productService.getProducts()
  .subscribe((data)=>{
    this.products=JSON.parse(JSON.stringify(data))
  })
}
  ngOnInit(): void {
    this.productService.getProducts()
    .subscribe((data)=>{
      this.products=JSON.parse(JSON.stringify(data))
      console.log(data);
    })
  }

  deleteProduct(_id){
    
    if(confirm("Are you sure you want to delete this product?")==true){
      console.log(_id);
      this.productService.deleteProduct(_id) 
      .subscribe((data)=>{
        this.products=JSON.parse(JSON.stringify(data));
       
        console.log(data);
      })
    }

    // if(confirm("Are you sure you want to delete this product?")==true){
    //   console.log(_id);
    //    this.productService.deleteProduct(_id) ;
    //    this.productService.getProducts()
    //   .subscribe((data)=>{
    //      this.products= JSON.parse(JSON.stringify(data))
    //     console.log(data);
    //   })
    // }
   

    // this._router.onSameUrlNavigation = 'reload';
    // this._router.navigate(['/']);
   }
     
 }

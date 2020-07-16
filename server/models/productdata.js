const mongoose=require('mongoose');

const Schema=mongoose.Schema;
var productSchema = new Schema({
    productId:Number,
    productName:String,
    productCode:String,
    releaseDate:String,
    description:String,
    price:Number,
    starRating:Number,
    imageUrl:String
})

var productData = mongoose.model('product',productSchema);

module.exports=productData;
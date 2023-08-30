import { model, Schema, mongoose} from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'


const collection = 'products'
const schema = new mongoose.Schema({ 
  title:{type:String,required:true, unique:true, index:true},
  description: {type:String,required:true},
  price: {type:Number,required:true},
  thumbnail: {type:String,required:true},
  stock: {type:Number,required:true, default:25},
  code: {type:String,required:true}
})
schema.plugin(mongoosePaginate)

let Product = mongoose.model(collection,schema)

export default Product


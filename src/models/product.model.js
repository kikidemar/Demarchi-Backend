import { model, Schema} from "mongoose";

const collection = 'products'
const schema = new Schema({ 
  title:{type:String,required:true},
  description: {type:String,required:true},
  price: {type:Number,required:true},
  thumbnail: {type:String,required:true},
  stock: {type:Number,required:true},
  code: {type:String,required:true}
})

let Product = model(collection,schema)
export default Product
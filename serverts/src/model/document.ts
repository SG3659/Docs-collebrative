import {Schema ,model, Document} from "mongoose"
export interface IDOCS extends Document{
   _id:string,
   name:string,
   data:object,
   createdAt:Date,
}

const userDocument =new Schema({
   _id: {
     type: String,
   },
   name: {
     type: String,
     require: true,
     default:'Untitled Document'
   },
   data: {
     type: Object,
   },
   createdAt: {
     type: Date,
   },
 },
 { timestamps: true })
const documentModel =model<IDOCS>("Document",userDocument)
export default documentModel;
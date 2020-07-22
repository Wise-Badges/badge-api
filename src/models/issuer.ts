export {};
import mongoose, { Document, Schema } from 'mongoose';

/*

All schemas are based on the official Open Badges documentation
https://www.imsglobal.org/sites/default/files/Badges/OBv2p0Final/index.html

and based on the needs of the API

*/

const IssuerSchema = new Schema(
  {
    '@context': { type: String, required: true },
    type: { type: String, required: true },
    id: { type: String, required: true },
    name: { type: String },
    image: { type: String },
    url: { type: String },
    email: { type: String }
  },
  {
    //makes sure showing this object doesn't give the _id info
    toJSON: {
      virtuals: true,
      transform: (doc: Document, obj: any) => {
        delete obj.__v;
        delete obj._id;
        return obj;
      }
    }
  }
);

interface IssuerI {
  '@context': string;
  type: string;
  id: string;
  name: string;
  image: string;
  url: string;
  email: string;
}

//custom type for Issuer Document
export type IssuerDocument = IssuerI & Document;

//Export model
export default mongoose.model('Issuer', IssuerSchema);

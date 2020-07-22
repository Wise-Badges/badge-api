export {};
import mongoose, { Document } from 'mongoose';
const Schema = mongoose.Schema;

const badgeclassSchema = new Schema(
  {
    '@context': { type: String, required: true },
    type: { type: String, required: true }, //"badgeclass"
    name: { type: String, required: true }, //no spaces!
    description: { type: String, required: true },
    image: { type: String, required: true },
    criteria: { narrative: { type: String, requiered: true } }, //with narrative!
    issuer: { type: String, required: true },
    tag: { type: String, requiered: true } //application specific field, not an open badges standard
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

//the url/id of a badgeclass is dependent of the _id and this is not predefined, so make it a virtual property
badgeclassSchema.virtual('id').get(function (this: BadgeclassDocument) {
  return '/badgeclass/' + this._id;
});

interface BadgeclassI {
  '@context': string;
  type: string;
  name: string;
  description: string;
  image: string;
  criteria: string;
  issuer: string;
  tag: string;
  id: string;

  toJSON(): any;
}

//custom type for Badgeclass Document
export type BadgeclassDocument = BadgeclassI & Document;

//Export model
export default mongoose.model('badgeclass', badgeclassSchema);

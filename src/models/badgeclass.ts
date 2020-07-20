export {};
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const badgeclassSchema = new Schema(
  {
    '@context': { type: String, required: true },
    type: { type: String, required: true }, //"badgeclass"
    name: { type: String, required: true }, //no spaces!
    description: { type: String, required: true },
    image: { type: String, required: true },
    criteria: { narrative: { type: String, requiered: true } }, //with narrative!
    issuer: { type: String, required: true }
  },
  {
    //makes sure showing this object doesn't give the _id info
    //TODO: correct obj type
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
//TODO: correct type for "this"
badgeclassSchema.virtual('id').get(function (this: any) {
  return '/badgeclass/' + this._id;
});

//Export model
module.exports = mongoose.model('badgeclass', badgeclassSchema);

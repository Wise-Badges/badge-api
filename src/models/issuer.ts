let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let IssuerSchema = new Schema(
    {
        "@context":  {type: String, required: true},
        type: {type: String, required: true},
        id: {type:String, required: true},
        name: {type:String, required: true},
        image: {type:String, required: true},
        url: {type:String, required: true},
        email: {type:String, required: true}
    },
    {
        //makes sure showing this object doesn't give the _id info
        toJSON: { virtuals: true, transform: (doc: Document, obj: any) => {delete obj.__v; delete obj._id; return obj;}}
    }
);

//Export model
module.exports = mongoose.model('Issuer', IssuerSchema);
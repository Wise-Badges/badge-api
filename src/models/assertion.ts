export {}
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AssertionSchema = new Schema(
    {
        "@context":  {type: String, required: true},
        recipient: {"type": { type: String, requiered: true}, hashed: {type:Boolean, requiered: true}, identity: {type:String, requiered: true}, name: {type:String} },
        sender: {identity: {type:String}, name: {type:String}}, //sender is not a field of an Open Badge, we add this to have fast access to who sent the Badge (not the issuer)
        type: {type:String, required:true}, //"Assertion"
        badge: {type:String, required: true},
        issuedOn: {type:String, required: true},
        evidence: {id: { type: String, requiered: true}, narrative: {type:String} }, //link to post
        verfication: { "type": {String, requiered: true} },
        accepted: {type: Boolean, default: false}
    },
    {
        //makes sure showing this object doesn't give the _id info
        //TODO: correct obj type
        toJSON: { virtuals: true, transform: (doc: Document, obj: any) => {delete obj.__v; delete obj._id; return obj;}}
    }
);

//TODO: correct "this" type
AssertionSchema
    .virtual('id')
    .get(function (this: any) {
            return '/assertion/' + this._id;
    });


//Export model
module.exports = mongoose.model('Assertion', AssertionSchema);
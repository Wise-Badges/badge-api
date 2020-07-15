let AssertionSchema = new Schema(
    {
        "@context":  {type: String, required: true},
        recipient: {type: String, required: true},
        type: {type:String, required:true}, //"Assertion"
        badge: {type:String, required: true},
        verification: {type:String, required: true},
        issuedOn: {type:String, required: true},
        evidence: {type:String, required: true} //link to post
    },
    {
        //makes sure showing this object doesn't give the _id info
        //TODO: correct obj type
        toJSON: { virtuals: true, transform: (doc: Document, obj: any) => {delete obj.__v; delete obj._id; return obj;}}
    }
);

//TODO: correct this type
AssertionSchema
    .virtual('id')
    .get(function (this: any) {
            return '/badgeclass/' + this._id;
    });


//Export model
module.exports = mongoose.model('Issuer', AssertionSchema);
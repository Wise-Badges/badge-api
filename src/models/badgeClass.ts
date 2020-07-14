let BadgeClassSchema = new Schema(
    {
        "@context":  {type: String, required: true},
        type: {type: String, required: true}, //"BadgeClass"
        id: {type:String, required: true},
        name: {type:String, required: true},
        description: {type:String, required: true},
        image: {type:String, required: true},
        criteria: {type:String, required: true}, //with narrative!
        issuer: {type:String, required: true},
        comment:  { type: [{
            narrative: {type: String, required: true}
          }]}
    },
    {
        //makes sure showing this object doesn't give the _id info
        //TODO: correct obj type
        toJSON: { virtuals: true, transform: (doc: Document, obj: any) => {delete obj.__v; delete obj._id; return obj;}}
    }
);

//Export model
module.exports = mongoose.model('Issuer', BadgeClassSchema);
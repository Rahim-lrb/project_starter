/*
! schema 
it's true mangoDB is schemaless, but it doesn't mean we can't organize it by enforcing a schema that won't allow additional data 
in the db and return errors when you oppose them (like the length of password)
const moviesSchema = mongoose.Schema({}, option)
options Obj: 
- timestamps: true => to add createdAt, updatedAt ... / id: false (stop generating ids)
{
    fName: String,
    lName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        trim: true => delete the spaces... 
    }
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    password: {
        type: String,
        minLength: 6,
        maxLength: 16,
        required: [true, "please add a password"],
        select: false => wont be returned 
    },
        role: {
        type: String,
        enum: ['user', 'publisher'], => choices
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}
- you can use arrays embedded obj
- index: true => to create an index  of email
- UserModel.createIndexes([{ username: 1, email: 1 },]) => create index using the model

! model (creating model using the schema)
represents documents in the MongoDB collection (mongoDB collection + schema), using it we can access
the DB using the model methods
- const Course = mongoose.model("model name", schema) (it should be capital)
note: model and schema are created in a new file inside models folder and get exported
*/ 



/*
! connect between collections
- we have posts collection and users collection, we want to show the owner of the post, we add a field called user to the post model
and when we create our post we insert that user Id => const newPostData = { user: userId , title, content };
- and in getAllPosts, we use population to decide if we want the whole user doc or only specific fields
const posts = await Post.find().populate({ 
        path: 'comments', 
        options: { sort: { createdAt: -1 } },
        populate: {  => we can even populate inside populate
            path: 'user', 
            select: 'name image' => we can specify what we want
        } 
}).populate('user').populate('likes').sort({ createdAt: -1 });
*/ 


/*
! changing the schema 
- by creating a middleware that'd operate either before the event or after: pre => before the event, post => after
- you can use any event update, find, save, validate ....etc
- this ("save") => access the values in the schema to edit them
- this ("deleteOne") => you can access the query passed
this._conditions._id => to get the conditions of the query
*/ 
exampleSchema.pre('save', function (next) {
    this.name = this.name.toUpperCase(); // Convert name to uppercase before saving
    next(); // Continue with the save operation
});



/*
! virtual
allow you to define properties on your schema that do not get persisted to MongoDB. unlike virtual
- we add courses field (virtual) to the bootcamp model
const model = ({
    
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
)

BootcampSchema.virtual("courses", {
    ref: "Course",
    localField: "_id",
    foreignField: "bootcamp",
    justOne: false,

} )
controller.js
query = Bootcamp.find(JSON.parse(queryStr)).populate("course")

*/ 


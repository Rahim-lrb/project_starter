/*
! mongoose
after learning how to create the server and receive requests, we need to learn how to communicate with the database to retrieve data
mongodb provides drivers for many languages ( a low level api to interact with mongo db), and there is on top of it mongoose
Object Data Modeling (ODM) library that provides a high level abstraction over the MongoDB driver by allowing to define schema (schema validation), model..
and make it easier and organized to work
note: we use mongodb atlas (a hosted db)
- install mongoDB , mongo shell (optional), mongoDB compass
- npm i mongoose (on your project and import it)
*/ 

/*
* server.js
- connect your project to the database
mongoose.connect("connection_string").then().catch() to connect to your database 
* models folder
- to create a schema (to accept only a specific data in db)
* routes or controllers
- after receiving the request from the client we handle it then interact with the database using the model we created 
import Model from './models/productModel.js'
- and we can use it to do the crud operation read, write, update, delete
note: we follow the mvc structure (model, controllers, view)
*/ 

/*
? crud operation (queries)
! write
const newProduct = { name: 'Example Product', price: 19.99, category: 'Electronics' };
- Model.create(newProduct).then().catch() [catch and try is better]
- const newProduct = new Model({ name: 'Example Product', price: 19.99, category: 'Electronics' });
newProduct.save() ==> this add it then saves it

! delete
model.deleteOne(filter, options)  => the whole product object 
model.deleteMany(filter, options) => the whole product object or {country: "algeria"}
model.findByIdAndDelete(id, options)
model.findOneAndDelete(filter, options)
note: options aren't important here

! update
- model.updateOne({filter}, modification, options) 
PersonModel.updateOne({ name: 'John' }, { age: 30 }); => replace the whole document with it
PersonModel.updateOne({ name: 'John' }, { $set: { age: 30 } }); => set a new value
- model.updateMany()
await PersonModel.updateMany({ isAdult: false }, { $set: { isAdult: true } });
- model.findOneAndUpdate(filter, modification) => {country: "algeria"}, {name: "med"}
- model.findByIdAndUpdate(id, modification) => {name: "max"}
- model.replaceOne(filter, {replacement})

* $ update operators
$set - $unset...etc

! read (client searches for data, you provide them + pagination, sorting...)
1- model.find()  => returns all the docs
2- model.find(filter) =>  PersonModel.find({ name: "max"}): => returns the docs matching the criteria
3- PersonModel.findOne({ name: 'John Doe' }):
4- model.findById( id ) => return the doc with that id

const bootcamps = await Bootcamp.find()
res.status(201).json({ success: true, count: bootcamps.length, data: bootcamps })
* projection 
is excluding some fields 
PersonModel.find({ name: "max"}, {name: 1, lastName: 1, age: 0}) => age is excluded

* filtering (operators)
$eq(equal) - $ne(not equal) - $gt(greater than) - $lt(less than) - $gte(greater than or equal) - $lte - $in...
PersonModel.find({ age: { $gte: 20, $lte: 60 } })

 Matches values that are equal to a specified value.
$ne: Matches values that are not equal to a specified value.
$gt: Matches values that are greater than a specified value.
$lt: Matches values that are less than a specified value.
$gte: Matches values that are greater than or equal to a specified value.
$lte: Matches values that are less than or equal to a specified value.
$in


* selecting 
* pagination
* aggregate



1- model.find({filter}, projection, options, callback)
PersonModel.find() => return every doc
PersonModel.find({ name: "max"}); => the matching doc
PersonModel.findOne({ name: 'John Doe' }); 
2- model.findById(2, ...)
3- model.findOne({filter})
PersonModel.find({ age: { $gte: 18 } }); => the matching doc
4- model.findOneById(id, ...)
-- 
- PersonModel.find({ name: "max"}, {name: 1, lname: 1, age: 0}); => 0 excluded
- the options: sorting and limiting
const query = PersonModel.find({}, {skip: 5})
- the callback to handle the result instead of then

*/ 


















/*
! read (find)             old
when the user is trying to get some sort of data, you should allow him use: filtering, sorting, pagination, limiting...etc
const bootcamps = await Bootcamp.find()
res.status(201).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps
})

? filtering (filter results) ?country=algeria, ?averageCost=bootcamps?averageCost[lte]=10000
const bootcamps = await Bootcamp.find(req.query) => simple cases (name=max)
- turn the req.query to string, and use match to return the operators and put before them $ so they can work and return it to json
let query;
let queryStr = JSON.stringify(req.query);
queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`) to return the operators but $ before them
query = Bootcamp.find(JSON.parse(queryStr)) 
const bootcamps = await query;
res.status(201).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps
})

? selecting (return specific fields): ?select=name.description.age (to include only these and id by default)
- 
let query; 
const reqQuery = { ...req.query } to copy it

let removeFields = [ "select", "sort"] fields to exclude
loop over remove fields and delete them from req query
removeFields.forEach(param => delete reqQuery[param] ) loop over them and exclude the select, sort...
console.log(reqQuery) empty


let queryStr = JSON.stringify(reqQuery); do the work on the new query
queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`)
query = Bootcamp.find(JSON.parse(queryStr)) return everything


if (req.query.select) {
    const fields = req.query.select.split(",").join(" ")
    query = query.select(fields)
    ? select fields => name,description,housing => name description housing
}

 if (req.query.sort) {
    console.log("sorted by default")
    const sortBy = req.query.sort.split(",").join(" ")
    query = query.sort(sortBy)
} else { // sorted descending using createdAT
    query = query.sort("-createdAt")
}


const bootcamps = await query; return only the selected

res.status(201).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps
})
* pagination 
const page = parseInt(req.query.page, 10 || 1) // to turn it to 
const limit = parseInt(req.query.limit, 10 || 100); // how many docs does the page contain if 1 then page 2 to see the others
const startIndex = (page - 1) * limit;
const endIndex = page * limit
const total = await Bootcamp.countDocuments()

query.skip(startIndex).limit(limit)


        pagination result 
const pagination = {}
if (endIndex < total) {
    pagination.next = {
        page: page + 1,
        limit
    }
}
if (startIndex > 0) {
    pagination.prev = {
        page: page - 1,
        limit
    }
}
*/ 

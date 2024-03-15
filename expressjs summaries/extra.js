/*
base 64 slow
! npm i multer => middleware for handling multipart/form-data, which is primarily used for uploading files. 
- utils/multer
const multer = require('multer');

const storage = multer.diskStorage({
    .. good
    cloudinary: cloudinary,
    params: {
        folder: 'your_folder_name', // Optional - folder to store images in Cloudinary
        format: async (req, file) => 'png', // Example: always convert images to PNG format
        public_id: (req, file) => file.originalname // Optional - use the original file name as the public_id
    }
    .. only if you want to store on the server

    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });
module.exports = upload;


! npm i cloudinary => platform to host your files 
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: "dauwoapmc",
    api_key: "999399123762465",
    api_secret: "E0vCvekm4TnOFXshZRxP26Lbot4"
});

module.exports = cloudinary;
* usage 
- in route
router.route('/')
    .get(postControllers.getAllPosts)
    .post(upload.single('image') ,postControllers.createPost)


- in controller
console.log(req.file) => to get the file 
const result = await cloudinary.uploader.upload(req.file.path); => to store it 
const image = result.secure_url; => to get the url to store it  in the db

const publicId = post.image.split('/').pop().split('.')[0]; // Extract public_id from the image URL
await cloudinary.uploader.destroy(publicId); // Delete the image from Cloudinary

note: don't yse express-uploadFile in server.js

*/ 
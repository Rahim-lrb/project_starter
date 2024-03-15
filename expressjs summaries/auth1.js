/*
! authentication and authorization (auth N and Z)
auth N: is checking the user identity and providing him the access to the protected page (route) (verified), determines whether the person is user or not.
auth Z: process, a the person’s or user’s authorities are checked for accessing the resources (validated), it determines What permission does the user have?
! auth types
* 1- stateful authorization
we use sessions to maintain a user's authenticated state across multiple requests. and that when we log in, the server creates 
a session and creates a session identifier (case id) and send it to the browser to save it and use it in every request.
* 2- stateless authorization
the requests contains the metadata needed (id, password, expiration, signature (ensures the integrity and authenticity of the token)..)
but these metadata are encrypted and encapsulated: json web tokens (JWT) or auth 0.. so can't be hacked 
note:
- there is a debate about which one is better
- sessions are easier and more secure if done properly
- cookies are more secure than storing and sending tokens manually 
note:
- we store both in cookies as a key-value pair (like localhost but good for credentials and security)
*/ 


/*
! token, bcrypt...etc
- create a user schema, and routes for registering and login in
- get the user credentials const 
{ name, email, password, role } = req.body;
* encrypt the password
npm i bcrypt 
userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) {
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})
note: you either do it on the controllers or here
- save the credentials in db
const user = await User.create({ name, email, password, role });
* return to the user a token (stored in cookies)
npm i cookie-parser => const cookieParser = require("cookie-parser") => app.use(cookieParse)

userSchema.methods.getSignedJwtToken = function() {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}
- to get the token 


const sendTokenResponse = async (user, statusCode, res) => {
    const token = await user.getSignedJwtToken();
    const options = {
        expires: new Date(new Date().getTime() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true
    };
    if (process.env.NODE_ENV == "production" ) { // so it can be sent and secures with https only but only in production
        options.secure = true
    }

    res.status(statusCode).cookie("toke", token, options).json({ success: true, token: token });
};
* login same thing but don't save in the db 


*/ 



/*
! protecting the routes 
is keeping accessing routes private, like only the user can create posts
    .post(protect ,createCourse)
inside auth.js in middleware create it
const protect = async (req, res, next) => {
    let token;
    try {
        . check if the token exists or not
        check if the req has an authentication token 
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        } else if (req.cookies.token) {
            token = req.cookies.token;
        }
        if (!token) {
            return next(new ErrorResponse("not authorized to access this route", 401));
        }
        . validate the token
        Verify the token using the JWT_SECRET from environment variables
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        . if the user exists in the db
        Retrieve user information from the database based on the decoded token
        const user = await User.findById(decoded.id);

        // verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);


        if (!user) {
            return next(new ErrorResponse("User not found", 401));
        }

        . allow the user to access the route
        next();
    } catch (err) {
        return next(new ErrorResponse("not authorized", 401));
    }
};

*/ 

/*
! forget password
const forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;

        . check if the user exists 
        const user = await User.findOne({ email });

        if (!user) {
            return next(new ErrorResponse("User not found", 404));
        }
        . generate a resetToken
        const resetToken = user.generatePasswordResetToken();

        . Save the user document with the new reset token
        await user.save();

        . Implement logic to send an email with the reset token to the user

        res.status(200).json({ success: true, message: "Password reset token sent to your email" });
    } catch (err) {
        next(err);
    }
};
*/ 
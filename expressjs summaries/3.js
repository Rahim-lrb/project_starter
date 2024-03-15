/*
! handling errors in nodejs
implementing mechanisms to manage and respond to errors that occur during the execution of your application, if we return the default error, it might cause our app 
* two places to handle errors in 
- in a specific case like 
if (!id) { res.status(500).json({ error: 'no id sent' }); }
- in catch
catch (err) { res.status(500).json({error: err.message}) }

* custom error and handleError middleware 
two types of errors: 
- syntax errors: detected by the compiler or interpreter during the compilation or parsing phase.
- runtime errors: detected by the runtime system while the program is running.
the Error object:
- an obj that has error properties: name, message
- throw new Error('This is an error'); => can be used to specify the error message
catch: 
- catches the whole Error obj and return it
? default error
catch (error) {
    res.status(500).json({success:false})
    next(error) => returns an html page that gives the error
}
- default status 500 and default response is html
? create an error handling middleware to return JSON
- handle errors in a centralized way, allowing you to define how errors are presented to the client.
- here we return the status code as 500 and a json obj when an error occurs
- don't forget to inject it in server.js with the middlewares
function errorHandling(err, req, res, next) {
    res.status(500).json({
        success: false,
        error: err.message
    })
}
? create a custom error class in utils
- we can use this to extend more functionality to the Error object
- now we can use ErrorResponse to inject message, statusCode in the errors we expect, and next(err) in the ones we don't
class ErrorResponse extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

catch (error) {
    next(new ErrorResponse(`bootcamp not found with the id of ...`, 404) )
}
*/ 


/*
example
function errorHandling(err, req, res, next) {
    console.log(err)
    let error = {...err}
    error.message = err.message;

    ! mongoose bad objectID
    if (err.name == "CastError") {
        const message = `bootcamp not found with id of ${err.value}`;
        error = new ErrorResponse(message, 404)
    }
    ! mongoose duplicate key
    if (err.name == "duplicate key") {
        const message = `duplicate field value entered`;
        error = new ErrorResponse(message, 400)
    }
    ! mongoose validation error
    if (err.name == "ValidationError") {
        const message = Object.values(err.errors).map(val => val.message)
        error = new ErrorResponse(message, 400)
    }
    ? another way
    if (err.name == "ValidationError") {
        return res.json({type: "validation error", details: err.details})
    }

    res.status(error.statusCode || 500 ).json({
        success: false,
        error: error.message || "server error"
    })

}
*/ 





/*
! steps of handling errors
- catch(err) res.json({err})  => is not flexible 
* catch (error) { next (error) }
more flexible but renders an html error page instead of json and affects the frontend
* errorHandler middleware 
app.use(errorHandler) in server.js after the routes, so the passed error is ready
function errorHandler(err, req, res, next) {
    res.status(500).json({ success: false, error: err.message  })
}
next(error);
- we return a json instead of an html 
- we can handle specific type of errors inside it 

* customError class => used for specific errors
- used to extend the functionality of the Error class
class ErrorResponse extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}
. example
    if (!user) {
        throw new ErrorResponse('User not found', 404);
    }
    res.status(200).json({ success: true, data: user });
} catch (err) {
    next(err); // general errors
    next(ErrorResponse('User not found', 404);)
}

* in the errorHandler , we handle specific types of errors

function errorHandler(err, req, res, next) {
    let error = {...err} => we clone it so not mess the original one
    error.message = err.message;

    if (err.name == "castError") {
        error = new ErrorResponse("bootcamp not found", 404)
    }


    res.status(error.statuscode || 500 ).json({ success: false, error: error.message  })
}

next(err): would be enough in that case, no need for specifying a message
*/ 




/*
! async await middleware
instead of writing catch/try every time we can write it once here and use this

const asyncHandler = fn => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next)

module.exports = asyncHandler;

* 1 
exports.getBootcamps = asyncHandler(async (req, res, next) => {
    try {
        const bootcamps = await Bootcamp.find();
        res.status(200).json({
            success: true,
            count: bootcamps.length,
            data: bootcamps
        });
    } catch (error) {
        next(error);
    }
});

* 2
exports.getBootcamps = asyncHandler(async  (req, res, next) => {
    const bootcamps = await Bootcamp.find()
    res.status(200).json({
        success: true,
        count: bootcamps.length,
        data: bootcamps
    })
})
*/ 

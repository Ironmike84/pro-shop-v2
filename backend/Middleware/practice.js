// const notFound (req, res, next){
//     let error = new Error(`Not Found ${req.originalUrl}`)
//     res.status(404)
//     next(error)
// }

// const ErrorHandler = (req, res, next)=>{
//     let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
//     message: err.message
    

//     if (err.name === "CastError" && err.kind === ObjectId){
//     message = "Not Found"
//     statusCode = 404
//     }
//     res.status(statusCode).json({
//         message,
//         stack: process.env.NODE_ENV == "production" ? "No Production" : err.stack
//     })
// }


const NotFound = (req, res, next)=>{
    let error = new Error(`Not Found ${req.originalUrl}`)
    res.status(404)
    next(error)
}

const ErrorHandling = (req, res, next){
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode
    let message = err.message

    if(err.name === "CastError" && err.kind === ObjectId){
        message: "Not Found"
        statusCode = 404;
    }

    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === "production" ? "No Production" : err.stack
    })

}


// export { errorHandler, notFound }

// const notFound = (req, res, next) =>{
//     const error = new Error(`Not Found - ${req.originalUrl}`)
//     res.status(404)
//     next(error)
// }

// const errorHandler = (req, res, next) =>{
//     let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
//     let message = err.message;

//     if (err.name === 'CastError' && err.kind === ObjectId){
//         message = "Resource Not Found";
//         statusCode = 404;
//     }
//     res.status(statusCode).json({
//         message,
//         stack: process.env.NODE_ENV === 'production' ? 'No Production': err.stack;
//     })

// }

export { errorHandler, notFound }

//1: Create function that requests OriginalURL and return 404 Status and then moves to the
// Next error.

const notFound = (request, response, next ) =>{
    let error = new Error(`Not Found ${request.originalUrl}`)
    response.status(404);
    next(error)
}

//2: Create the ErrorHandler which takes in the status code of 200 and return it as 500, else
// return the original status code;

const errorHandler = (request, response, next) => {
    let statusCode = response.statusCode === 200 ? 500 : response.statusCode
    message = err.message

    if(err.name === "CastError" && err.kind === ObjectId){
        message = "Resource Not Found"
        statusCode = 404
    }
    response.statusCode(statusCode).json({
        message: message,
        stack: process.env.NODE_ENV === 'production' ? 'No Production': err.stack
    })
    
}

//3: assign the error message to a variable


//4: create an if else statement that checks for a "CastError" and checks for the kind of error to be an ObjectId;

//5: then return a Message;
// define status code

//6: Define the response status code and convert it to json.

//7 set variables in json
//  Message: message,
// stack : ???


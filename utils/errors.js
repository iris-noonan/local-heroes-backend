//!--- Custom Error Classes

//!--- These custom error classes allow us to effectively add our own classes to the built-in error JS Error class
//!--- It is giving use the ability to give bespoke messages that we want to give about an error.
//!--- In practice this is great for us to give the user more specific feedback in our own words about what their error is
//and if required what they need to do to proceed. 
class Unauthorized extends Error {
    constructor(message) {
        super(message)
        this.name = 'Unauthorized'//These are custom messages can we be more helpful than jus Unauthorized and if not shall we use inglish spelling?
    }
}

class Forbidden extends Error {
    constructor(message) {
        super(message)
        this.name = 'Forbidden'
    }
}

class NotFound extends Error {
    constructor(message) {
        super(message)
        this.name = 'NotFound'
    }
}



//!--- Template for displaying the error messages
const logErrors = (error) => {
    console.log('\n***********************\n')
    console.log('⚠️ ERROR ⚠️')
    console.log('\n***********************\n')
    console.log('Type:\n')
    console.log(error.name)
    console.log('\n***********************\n')
    console.log('Details:\n')
    console.log(error.errors ? JSON.parse(JSON.stringify(error.errors)) : error.message)
    console.log('\n***********************\n')
    console.log('This error was thrown during the below request ⬇️ \n')
    console.log('\n***********************\n')
}

//!--- Function to send the error response to the client

const sendError = (error, res) => {
    //*--- Console.log errors
    logErrors(error)

    //!--- Set of possible/forseable errors and response based upon what the error is.

    //*---MongoServerError
    //This happens when the client attempts to create a duplicate entry for a unique field
    //The error: This if is always the error to select which response to send. Wont rewrite for every error. 
    if (error.name === 'MongoServerError' && error.code === 11000) {
        //Extracting the name and value of the duplicated field
        const [fieldName, fieldValue] = Object.entries(error.keyValue)[0]
        //Responds with message using the extracted name and value of the duplicated field. 
        return res.status(400).json({ errorMessage: `${fieldName} "${fieldValue}" already taken. Please try another.` })
    }

    //*---ValidationError
    // This happens when field errors occur (like required constraint or incorrect type)
    if (error.name === 'ValidationError') {
        return res.status(422).json(error.errors)
    }

    //*--- Cast Error
    // This error is thrown when Mongoose fails to cast a string to an ObjectId
    if (error.name === 'CastError') {
        return res.status(400).json({ errorMessage: error.message })
    }

    //*--- Unauthorized
    // This error is thrown when the user fails to identify themselves
    if (error.name === 'Unauthorized') {
        return res.status(401).json({ errorMessage: 'Unauthorized' })
    }

    //*--- Forbidden
    // This error is thrown when an authenticated user is denied access to an authorized resource
    if (error.name === 'Forbidden') {
        return res.status(403).json({ errorMessage: 'You are not authorized to access that resource' })
    }

    //*--- NotFound
    // This error occurs when a resource could not be located
    if (error.name === 'NotFound') {
        return res.status(404).json({ errorMessage: error.message })
    }

    //*--- Generic Server Error
    // This is for every unknown error that is thrown, that is not in the list above and returns a generic error message.
    return res.status(500).json({ errorMessage: 'An unknown error occurred.' })
}


module.exports = {
    sendError,
    Unauthorized,
    Forbidden,
    NotFound
}
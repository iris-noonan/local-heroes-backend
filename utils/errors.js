
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

//!--- Function


module.exports = {
    sendError,
    Unauthorized,
    Forbidden,
    NotFound
}
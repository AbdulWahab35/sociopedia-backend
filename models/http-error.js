class HttpError extends Error{
    constructor(errorMessage, statusCode){
        super(errorMessage);
        this.code = statusCode
    }
}

module.exports = HttpError;
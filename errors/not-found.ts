export default class NotFound extends Error {
    statusCode = 404;
    constructor(message = "Entity not found", options = {}) {
        super(message, options);
    }
}

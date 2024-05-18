export default class NotAllowed extends Error {
    statusCode = 403;
    constructor(message = "Operation not allowed", options = {}) {
        super(message, options);
    }
}

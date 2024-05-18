export default class BadRequest extends Error {
    statusCode = 400;
    constructor(message = "Wrong credential", options = {}) {
        super(message, options);
    }
}

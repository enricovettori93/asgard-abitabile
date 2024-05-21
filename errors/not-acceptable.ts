export default class NotAcceptable extends Error {
    statusCode = 406;
    constructor(message = "Not acceptable", options = {}) {
        super(message, options);
    }
}

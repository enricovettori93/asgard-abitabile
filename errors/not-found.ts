export default class NotFound extends Error {
    constructor(message = "Entity not found", options = {}) {
        super(message, options);
    }
}

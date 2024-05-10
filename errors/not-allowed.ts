export default class NotAllowed extends Error {
    constructor(message = "Operation not allowed", options = {}) {
        super(message, options);
    }
}

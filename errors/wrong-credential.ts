export default class WrongCredential extends Error {
    constructor(message = "Wrong credential", options = {}) {
        super(message, options);
    }
}

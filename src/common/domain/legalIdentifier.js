import validateExp from "./regexValidator.js";

export function validateLegalIdentifier(identifier){
    return validateExp(/^([a-z|A-Z]{1})?[-. ]?(\w{5,50})$/,identifier,'legal identifier')
}


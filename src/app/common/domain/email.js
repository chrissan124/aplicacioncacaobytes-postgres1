import validateExp from "./regexValidator.js"

export default function validateEmail(email){
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return validateExp(regex,email,'email')
}

import validateExp from "./regexValidator.js"

export default function validatePhone(phone){
                                                      
    const regExps = 
    [
        //+XX-XXXX-XXXX   
        /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/,
        //+XX-XXX-XXX-XXXX
        /^\+?([0-9]{2})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})?[-. ]?([0-9]{4})$/,
        //XXX-XXX-XXXX
        /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
        //+XXXXXXXXXXX
        /^\+?([0-9]{12})$/
    ]
    validateExp(regExps,phone, 'phone number')
}



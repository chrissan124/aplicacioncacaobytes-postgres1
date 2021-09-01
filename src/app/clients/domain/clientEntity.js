import validateEmail from "../../common/domain/email.js"
import betweenValidator from "../../common/domain/betweenValidator.js"
import validatePhone from "../../common/domain/phone.js"
import { validateLegalIdentifier } from "../../common/domain/legalIdentifier.js"

export default function clientEntity({
    name,
    legalIdentifier,
    email,
    phone,
    clientId,
    addressId,
    statusId
}){
    const trimmedName = betweenValidator.stringBetween(name,2,100,'name')
    validateLegalIdentifier(legalIdentifier)
    validateEmail(email)
    validatePhone(phone)

    return Object.freeze({
        name:trimmedName,
        legalIdentifier,
        email,
        phone,
        clientId,
        addressId,
        statusId,
        isCreated:()=>clientId!=undefined 
    })
}

/*
try {
    const client =clientEntity({name:'lu',legalIdentifier:'V-26825039',phone:'+58-424-151-3995', email:'luis@yo.com'})
    console.log(client)
} catch (error) {
    console.log(error.message)
}
*/
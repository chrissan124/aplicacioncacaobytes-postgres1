import betweenValidator from "../../common/domain/betweenValidator";
import validateEmail from "../../common/domain/email";
import { validateLegalIdentifier } from "../../common/domain/legalIdentifier";
import validatePhone from "../../common/domain/phone";

export default function employeeEntity({
    legalIdentifier,
    firstName,
    secondName,
    lastName,
    secondLastName,
    email,
    phone,
    employId,
    addressId,
    statusId
}){
    validateLegalIdentifier(legalIdentifier)
    validatePhone(phone)
    validateEmail(email)
    betweenValidator.stringBetween(firstName,2,50,'name')
    betweenValidator.stringBetween(lastName,2,50,'name')


    return Object.freeze({
        legalIdentifier,
        firstName,
        secondName,
        lastName,
        secondLastName,
        email,
        phone,
        employId,
        addressId,
        statusId
    })


}
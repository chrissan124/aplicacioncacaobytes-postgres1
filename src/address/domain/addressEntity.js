import betweenValidator from "../../common/domain/betweenValidator.js";

export default function addressEntity({
    primaryLine,
    secondaryLine,
    city,
    state,
    country,
    zipCode,
    addressId
}){
    betweenValidator.stringBetween(primaryLine,2,200)
    betweenValidator.stringBetween(secondaryLine,2,200)
    betweenValidator.stringBetween(city,2,100,'city')
    betweenValidator.stringBetween(state,2,100,'state')
    betweenValidator.stringBetween(country,2,100,'country')
    betweenValidator.stringBetween(zipCode,4,5,'zip')

    return Object.freeze({
        primaryLine,
        secondaryLine,
        city,
        state,
        country,
        zipCode,
        addressId
    })
}
